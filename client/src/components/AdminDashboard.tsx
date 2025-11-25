import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { authRequest } from "@/lib/authRequest";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, LogOut, Package, MessageSquare, Upload, Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { Product, InsertProduct, Message } from "@shared/schema";

export function AdminDashboard() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<InsertProduct>>({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    images: [],
    category: "",
    isFeatured: false,
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const { data: products, isLoading: loadingProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: messages } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  const addProductMutation = useMutation({
    mutationFn: async (product: InsertProduct) => {
      return await authRequest("POST", "/api/products", product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Success", description: "Product added successfully" });
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, ...product }: Product) => {
      return await authRequest("PUT", `/api/products/${id}`, product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Success", description: "Product updated successfully" });
      setEditingProduct(null);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      return await authRequest("DELETE", `/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Success", description: "Product deleted successfully" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      });
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (id: string) => {
      return await authRequest("DELETE", `/api/messages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      toast({ title: "Success", description: "Message deleted successfully" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete message",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      images: [],
      category: "",
      isFeatured: false,
    });
    setSelectedFiles([]);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error('Failed to upload image');
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      setFormData({ ...formData, imageUrl: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.imageUrl;
      let images = formData.images || [];
      
      if (selectedFiles.length > 0) {
        setUploading(true);
        const uploadedUrls = await Promise.all(
          selectedFiles.map(file => uploadImage(file))
        );
        images = uploadedUrls;
        imageUrl = uploadedUrls[0];
      }
      
      const productData = { ...formData, imageUrl, images };
      
      if (editingProduct) {
        updateProductMutation.mutate({ ...editingProduct, ...productData } as Product);
      } else {
        addProductMutation.mutate(productData as InsertProduct);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-medium">TrendyTrove Admin</h1>
            <p className="text-sm text-muted-foreground">Temiloluwa Sanusi</p>
          </div>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-6">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Product Management
                </CardTitle>
                <CardDescription>
                  Add, edit, or remove products from your store
                </CardDescription>
              </div>
              <Dialog open={isAddDialogOpen || !!editingProduct} onOpenChange={(open) => {
                if (!open) {
                  setIsAddDialogOpen(false);
                  setEditingProduct(null);
                  resetForm();
                }
              }}>
                <DialogTrigger asChild>
                  <Button onClick={() => setIsAddDialogOpen(true)} data-testid="button-add-product">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? "Edit Product" : "Add New Product"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingProduct ? "Update product details and mark as featured if desired" : "Fill in the product details below. You can upload an image or provide a URL."}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        data-testid="input-product-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        required
                        data-testid="textarea-product-description"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price (₦) *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          required
                          data-testid="input-product-price"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger id="category" data-testid="select-product-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Clothing">Clothing</SelectItem>
                            <SelectItem value="Accessories">Accessories</SelectItem>
                            <SelectItem value="Footwear">Footwear</SelectItem>
                            <SelectItem value="Outerwear">Outerwear</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="imageFile">Upload Image</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            id="imageFile"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="flex-1"
                          />
                          {selectedFiles.length > 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Upload className="w-4 h-4" />
                                {selectedFiles.length} file(s) selected
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                {selectedFiles.map((file, index) => (
                                  <div key={index} className="relative">
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={`Preview ${index + 1}`}
                                      className="w-16 h-16 object-cover rounded border"
                                    />
                                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                      {index + 1}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                          id="imageUrl"
                          type="url"
                          value={formData.imageUrl}
                          onChange={(e) => {
                            setFormData({ ...formData, imageUrl: e.target.value });
                            if (e.target.value) setSelectedFiles([]);
                          }}
                          placeholder="https://example.com/image.jpg"
                          data-testid="input-product-image"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Upload multiple files or enter a direct link to the main product image
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
                      <Checkbox
                        id="isFeatured"
                        checked={formData.isFeatured || false}
                        onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked as boolean })}
                        data-testid="checkbox-featured"
                      />
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary" />
                        <Label htmlFor="isFeatured" className="cursor-pointer">
                          Mark as Featured Product
                        </Label>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={addProductMutation.isPending || updateProductMutation.isPending || uploading || (selectedFiles.length === 0 && !formData.imageUrl)}
                        data-testid="button-save-product"
                      >
                        {uploading ? "Uploading..." : editingProduct ? "Update Product" : "Add Product"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsAddDialogOpen(false);
                          setEditingProduct(null);
                          resetForm();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loadingProducts ? (
                <p className="text-muted-foreground">Loading products...</p>
              ) : !products || products.length === 0 ? (
                <p className="text-muted-foreground">No products yet. Add your first product!</p>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <Card key={product.id} className="p-4" data-testid={`card-admin-product-${product.id}`}>
                      <div className="flex gap-4">
                        <div className="relative">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-md bg-muted"
                          />
                          {product.images && product.images.length > 1 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {product.images.length}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium truncate">{product.name}</h3>
                            {product.isFeatured && (
                              <Star className="w-4 h-4 text-primary fill-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-primary font-medium">
                              ₦{parseFloat(product.price).toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">{product.category}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(product)}
                            data-testid={`button-edit-${product.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this product?")) {
                                deleteProductMutation.mutate(product.id);
                              }
                            }}
                            data-testid={`button-delete-${product.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Customer Messages
              </CardTitle>
              <CardDescription>
                Messages from your contact form
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!messages || messages.length === 0 ? (
                <p className="text-muted-foreground">No messages yet</p>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <Card key={message.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{message.customerName}</p>
                          <p className="text-sm text-muted-foreground">{message.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this message?")) {
                                deleteMessageMutation.mutate(message.id);
                              }
                            }}
                          >
                            <Trash2 className="w-3 h-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
