import { createClient } from '@supabase/supabase-js';
import type { Product, InsertProduct, Message, InsertMessage } from "@shared/schema";

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct, authHeader?: string): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>, authHeader?: string): Promise<Product>;
  deleteProduct(id: string, authHeader?: string): Promise<void>;

  // Messages
  getAllMessages(authHeader?: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class SupabaseStorage implements IStorage {
  private getClient(authHeader?: string) {
    // Create a client with auth token if provided
    // This allows Supabase RLS policies to work correctly
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      });
    }
    return createClient(supabaseUrl, supabaseAnonKey);
  }

  // Map database column names (snake_case) to TypeScript property names (camelCase)
  private mapProductFromDB(dbProduct: any): Product {
    return {
      id: dbProduct.id,
      name: dbProduct.name,
      description: dbProduct.description,
      price: dbProduct.price,
      imageUrl: dbProduct.image_url,
      category: dbProduct.category,
      isFeatured: dbProduct.is_featured || false,
      createdAt: dbProduct.created_at,
    };
  }

  // Map TypeScript property names (camelCase) to database column names (snake_case)
  private mapProductToDB(product: Partial<InsertProduct>): any {
    const dbProduct: any = {};
    if (product.name !== undefined) dbProduct.name = product.name;
    if (product.description !== undefined) dbProduct.description = product.description;
    if (product.price !== undefined) dbProduct.price = product.price;
    if (product.imageUrl !== undefined) dbProduct.image_url = product.imageUrl;
    if (product.category !== undefined) dbProduct.category = product.category;
    if (product.isFeatured !== undefined) dbProduct.is_featured = product.isFeatured;
    return dbProduct;
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    const supabase = this.getClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data || []).map(this.mapProductFromDB);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const supabase = this.getClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return undefined;
      throw new Error(error.message);
    }
    return data ? this.mapProductFromDB(data) : undefined;
  }

  async createProduct(product: InsertProduct, authHeader?: string): Promise<Product> {
    const supabase = this.getClient(authHeader);
    const dbProduct = this.mapProductToDB(product);
    const { data, error } = await supabase
      .from('products')
      .insert([dbProduct])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapProductFromDB(data);
  }

  async updateProduct(id: string, product: Partial<InsertProduct>, authHeader?: string): Promise<Product> {
    const supabase = this.getClient(authHeader);
    const dbProduct = this.mapProductToDB(product);
    const { data, error } = await supabase
      .from('products')
      .update(dbProduct)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapProductFromDB(data);
  }

  async deleteProduct(id: string, authHeader?: string): Promise<void> {
    const supabase = this.getClient(authHeader);
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  // Map database column names (snake_case) to TypeScript property names (camelCase) for messages
  private mapMessageFromDB(dbMessage: any): Message {
    return {
      id: dbMessage.id,
      customerName: dbMessage.customer_name,
      email: dbMessage.email,
      message: dbMessage.message,
      createdAt: dbMessage.created_at,
    };
  }

  // Map TypeScript property names (camelCase) to database column names (snake_case) for messages
  private mapMessageToDB(message: InsertMessage): any {
    return {
      customer_name: message.customerName,
      email: message.email,
      message: message.message,
    };
  }

  // Messages
  async getAllMessages(authHeader?: string): Promise<Message[]> {
    const supabase = this.getClient(authHeader);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false});

    if (error) throw new Error(error.message);
    return (data || []).map(this.mapMessageFromDB);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const supabase = this.getClient();
    const dbMessage = this.mapMessageToDB(message);
    const { data, error } = await supabase
      .from('messages')
      .insert([dbMessage])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapMessageFromDB(data);
  }
}

export const storage = new SupabaseStorage();
