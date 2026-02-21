import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package, DollarSign, TrendingUp, BarChart3,
  Plus, Trash2, Edit2, X, Star, StarOff,
  ShoppingCart, Upload, LogOut, Settings,
  FileText, CreditCard, Truck, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { productsAPI, ordersAPI, analyticsAPI, bannerAPI, authAPI, API_BASE_URL, getImageUrl } from "@/lib/api";
import { formatPrice } from "@/data/products";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [banners, setBanners] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    try {
      await authAPI.verify();
    } catch {
      navigate('/admin/login');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, ordersData, analyticsData, bannersData] = await Promise.all([
        productsAPI.getAll(),
        ordersAPI.getAll({ limit: 50 }),
        analyticsAPI.getDashboard(30),
        bannerAPI.getAll(),
      ]);
      setProducts(productsData);
      setOrders(ordersData.orders || []);
      setAnalytics(analyticsData);
      setBanners(bannersData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    navigate('/admin/login');
  };

  const handleCreateProduct = async (formData: FormData) => {
    try {
      await productsAPI.create(formData);
      toast({ title: "Success", description: "Product created successfully" });
      setIsAddDialogOpen(false);
      loadData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async (id: string, formData: FormData) => {
    try {
      await productsAPI.update(id, formData);
      toast({ title: "Success", description: "Product updated successfully" });
      setEditingProduct(null);
      loadData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await productsAPI.delete(id);
      toast({ title: "Success", description: "Product deleted successfully" });
      loadData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await ordersAPI.updateStatus(orderId, status);
      toast({ title: "Success", description: "Order status updated" });
      loadData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdatePrice = async (productId: string, price: number) => {
    if (price <= 0) return;
    const formData = new FormData();
    formData.append('price', price.toString());
    try {
      await productsAPI.update(productId, formData);
      toast({ title: "Success", description: "Price updated" });
      loadData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateStock = async (productId: string, stock: number) => {
    if (stock < 0) return;
    const formData = new FormData();
    formData.append('stock', stock.toString());
    try {
      await productsAPI.update(productId, formData);
      toast({ title: "Success", description: "Stock updated" });
      loadData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (product: any) => {
    const formData = new FormData();
    formData.append('featured', (!product.featured).toString());
    try {
      await productsAPI.update(product._id || product.id, formData);
      toast({ title: "Success", description: "Featured status updated" });
      loadData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <div className="text-center py-20">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your e-commerce store</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(analytics.metrics.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              <ShoppingCart className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.metrics.totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">Avg: {formatPrice(analytics.metrics.averageOrderValue)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
              <Package className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.metrics.totalProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">{analytics.metrics.lowStockProducts} low stock</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Product</CardTitle>
              <TrendingUp className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.topProducts[0]?.name || 'N/A'}</div>
              <p className="text-xs text-muted-foreground mt-1">{analytics.topProducts[0]?.totalSold || 0} sold</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Tabs */}
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="banner">Banner</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Manage "The Collection" Section</CardTitle>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="btn-gold gap-2">
                      <Plus className="w-4 h-4" /> Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <ProductForm onSubmit={handleCreateProduct} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Featured Products (Home Page Collection)</h3>
                  {featuredProducts.length === 0 ? (
                    <p className="text-muted-foreground text-sm italic mb-4">No featured products selected.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {featuredProducts.map((product) => (
                        <div key={product._id || product.id} className="border rounded-lg p-4 space-y-3">
                          <div className="relative aspect-[3/4] bg-secondary rounded overflow-hidden">
                            <img
                              src={getImageUrl(product.images?.[0])}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => handleToggleFeatured(product)}
                            >
                              <StarOff className="w-4 h-4 mr-2" />
                              Remove from Collection
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="w-full"
                              onClick={() => handleDeleteProduct(product._id || product.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Product
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-4">All Products</h3>
                  {products.length === 0 ? (
                    <p className="text-muted-foreground text-sm italic">No products found.</p>
                  ) : (
                    <div className="space-y-4">
                      {products.map((product) => (
                        <div key={product._id || product.id} className="border rounded-lg p-4">
                          <div className="flex gap-4">
                            <div className="w-24 h-32 bg-secondary rounded overflow-hidden flex-shrink-0">
                              <img
                                src={getImageUrl(product.images?.[0])}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-3">
                              <div>
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">{product.category}</p>
                              </div>
                              <div className="flex gap-4">
                                <div>
                                  <Label className="text-xs">Price (₹)</Label>
                                  <Input
                                    type="number"
                                    value={product.price}
                                    onChange={(e) => handleUpdatePrice(product._id || product.id, parseFloat(e.target.value))}
                                    className="w-32"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Stock</Label>
                                  <Input
                                    type="number"
                                    value={product.stock}
                                    onChange={(e) => handleUpdateStock(product._id || product.id, parseInt(e.target.value))}
                                    className="w-32"
                                  />
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant={product.featured ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleToggleFeatured(product)}
                                >
                                  {product.featured ? <Star className="w-4 h-4 mr-2" /> : <StarOff className="w-4 h-4 mr-2" />}
                                  {product.featured ? 'Featured' : 'Not Featured'}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingProduct(product)}
                                >
                                  <Edit2 className="w-4 h-4 mr-2" />
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteProduct(product._id || product.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Ref</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">Loading orders...</TableCell>
                    </TableRow>
                  ) : orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">No orders found</TableCell>
                    </TableRow>
                  ) :
                    orders.map((order: any) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-xs">{order.orderReference || order.orderNumber}</TableCell>
                        <TableCell>
                          {order.source === 'whatsapp' ? (
                            <span title="WhatsApp Order" className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs">WA</span>
                          ) : (
                            <span title="Website Order" className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs">WEB</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customer.name}</div>
                            <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(order.created_at || Date.now()).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleUpdateOrderStatus(order.id || order._id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Processing">Processing</SelectItem>
                              <SelectItem value="Shipped">Shipped</SelectItem>
                              <SelectItem value="Delivered">Delivered</SelectItem>
                              <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'secondary'}>
                            {order.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatPrice(order.total || 0)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          {analytics && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Chart (Last 30 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics.charts.dailyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="_id" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue (₹)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.topProducts.slice(0, 5).map((product: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-secondary rounded overflow-hidden">
                              <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-muted-foreground">{product.totalSold} sold</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{formatPrice(product.revenue)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Category Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analytics.charts.categorySales}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Banner Tab */}
        <TabsContent value="banner">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Banner Management</CardTitle>
            </CardHeader>
            <CardContent>
              <BannerManager banners={banners} onUpdate={loadData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Product Dialog */}
      {editingProduct && (
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              onSubmit={(formData) => handleUpdateProduct(editingProduct._id || editingProduct.id, formData)}
              onDelete={handleDeleteProduct}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder.orderNumber}</DialogTitle>
            </DialogHeader>
            <OrderDetail order={selectedOrder} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Product Form Component
const ProductForm = ({ product, onSubmit, onDelete }: { product?: any; onSubmit: (formData: FormData) => void; onDelete?: (id: string) => void }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    shortDescription: product?.shortDescription || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    category: product?.category || 'Statement',
    sizes: product?.sizes || ['S', 'M', 'L', 'XL'],
    featured: product?.featured || false,
  });
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('shortDescription', formData.shortDescription);
    form.append('price', formData.price.toString());
    form.append('stock', formData.stock.toString());
    form.append('category', formData.category);
    form.append('sizes', JSON.stringify(formData.sizes));
    form.append('featured', formData.featured.toString());
    images.forEach((img) => form.append('images', img));
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Product Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price (₹)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            required
            min="0"
          />
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
            required
            min="0"
          />
        </div>
      </div>
      <div>
        <Label>Category</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Statement">Statement</SelectItem>
            <SelectItem value="Essentials">Essentials</SelectItem>
            <SelectItem value="Premium">Premium</SelectItem>
            <SelectItem value="Sport">Sport</SelectItem>
            <SelectItem value="Minimalist">Minimalist</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Short Description</Label>
        <Input
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
        />
      </div>
      <div>
        <Label>Full Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
        />
      </div>
      <div>
        <Label>Product Images</Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
          required={!product}
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
        />
        <Label htmlFor="featured">Featured (Show in Collection section)</Label>
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="btn-gold flex-1">
          {product ? 'Update Product' : 'Create Product'}
        </Button>
        {product && onDelete && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => onDelete(product._id || product.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        )}
      </div>
    </form>
  );
};

// Banner Manager Component
const BannerManager = ({ banners, onUpdate }: { banners: any[]; onUpdate: () => void }) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('position', 'hero');
    formData.append('active', 'true');

    try {
      await bannerAPI.create(formData);
      toast({ title: "Success", description: "Banner uploaded successfully" });
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-input rounded-lg p-8 text-center">
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <Input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="max-w-xs mx-auto"
        />
        <p className="text-sm text-muted-foreground mt-2">Upload new hero banner image</p>
      </div>
      {banners.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map((banner) => (
            <div key={banner.id || banner._id} className="border rounded-lg overflow-hidden">
              <img src={getImageUrl(banner.image)} alt={banner.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant={banner.active ? 'default' : 'secondary'}>
                    {banner.active ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      try {
                        await bannerAPI.delete(banner._id);
                        toast({ title: "Success", description: "Banner deleted" });
                        onUpdate();
                      } catch (error: any) {
                        toast({
                          title: "Error",
                          description: error.message,
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Order Detail Component
const OrderDetail = ({ order }: { order: any }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">Customer Information</h4>
          <div className="space-y-1 text-sm">
            <p><strong>Name:</strong> {order.customer.name}</p>
            <p><strong>Email:</strong> {order.customer.email}</p>
            <p><strong>Phone:</strong> {order.customer.phone}</p>
            <p><strong>Address:</strong> {order.customer.address.street}, {order.customer.address.city}, {order.customer.address.state} {order.customer.address.zipCode}</p>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Payment Details</h4>
          <div className="space-y-1 text-sm">
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            <p><strong>Status:</strong> <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'secondary'}>{order.paymentStatus}</Badge></p>
            {order.paymentScreenshotUrl && (
              <div className="mt-2">
                <p className="font-medium mb-1">Payment Screenshot:</p>
                <a href={getImageUrl(order.paymentScreenshotUrl)} target="_blank" rel="noopener noreferrer" className="block w-full max-w-[200px] border rounded overflow-hidden hover:opacity-90 transition-opacity">
                  <img src={getImageUrl(order.paymentScreenshotUrl)} alt="Payment Screenshot" className="w-full h-auto" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Order Items</h4>
        <div className="space-y-2">
          {order.items.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">Size: {item.size} × {item.quantity}</p>
              </div>
              <p>{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>{formatPrice(order.shipping)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2">
          <span>Total:</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
