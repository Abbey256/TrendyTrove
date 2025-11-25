import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products endpoints
  // Security: Protected by Supabase RLS policies (see supabase_setup.sql)
  // - Public can read products
  // - Only authenticated users can create/update/delete products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error: any) {
      // Handle case where tables don't exist yet
      if (error.message.includes('relation') || error.message.includes('table')) {
        return res.status(503).json({ 
          error: "Database not initialized. Please run the SQL setup script in your Supabase dashboard. See SETUP_INSTRUCTIONS.md for details." 
        });
      }
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData, authHeader);
      res.status(201).json(product);
    } catch (error: any) {
      // Supabase RLS will return permission denied if not authenticated
      if (error.message.includes('permission') || error.message.includes('policy')) {
        return res.status(401).json({ error: "Unauthorized. Please login as admin." });
      }
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const validatedData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, validatedData, authHeader);
      res.json(product);
    } catch (error: any) {
      if (error.message.includes('permission') || error.message.includes('policy')) {
        return res.status(401).json({ error: "Unauthorized. Please login as admin." });
      }
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      await storage.deleteProduct(req.params.id, authHeader);
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes('permission') || error.message.includes('policy')) {
        return res.status(401).json({ error: "Unauthorized. Please login as admin." });
      }
      res.status(500).json({ error: error.message });
    }
  });

  // Messages endpoints
  // Security: Protected by Supabase RLS policies
  // - Public can create messages (contact form)
  // - Only authenticated users can read messages (admin)
  app.get("/api/messages", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const messages = await storage.getAllMessages(authHeader);
      res.json(messages);
    } catch (error: any) {
      if (error.message.includes('permission') || error.message.includes('policy')) {
        return res.status(401).json({ error: "Unauthorized. Please login as admin." });
      }
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(validatedData);
      res.status(201).json(message);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/messages/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      await storage.deleteMessage(req.params.id, authHeader);
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes('permission') || error.message.includes('policy')) {
        return res.status(401).json({ error: "Unauthorized. Please login as admin." });
      }
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
