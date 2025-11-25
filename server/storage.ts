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

  // Products
  async getAllProducts(): Promise<Product[]> {
    const supabase = this.getClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const supabase = this.getClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return undefined; // Not found
      throw new Error(error.message);
    }
    return data;
  }

  async createProduct(product: InsertProduct, authHeader?: string): Promise<Product> {
    const supabase = this.getClient(authHeader);
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>, authHeader?: string): Promise<Product> {
    const supabase = this.getClient(authHeader);
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async deleteProduct(id: string, authHeader?: string): Promise<void> {
    const supabase = this.getClient(authHeader);
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  // Messages
  async getAllMessages(authHeader?: string): Promise<Message[]> {
    const supabase = this.getClient(authHeader);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('createdAt', { ascending: false});

    if (error) throw new Error(error.message);
    return data || [];
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const supabase = this.getClient();
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}

export const storage = new SupabaseStorage();
