import type { Request, Response, NextFunction } from "express";
import { supabase } from "./supabase";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const token = authHeader.substring(7);
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    // Attach user to request for use in routes
    (req as any).user = user;
    next();
  } catch (error: any) {
    return res.status(401).json({ error: "Unauthorized - Authentication failed" });
  }
}
