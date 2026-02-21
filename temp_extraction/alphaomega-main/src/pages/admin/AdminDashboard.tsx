import { useState } from "react";
import { Upload, BarChart3, TrendingUp, Package, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
    const { toast } = useToast();
    const [bannerImage, setBannerImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create a fake local URL for preview
            const url = URL.createObjectURL(file);
            setBannerImage(url);
            toast({
                title: "Banner Updated",
                description: "Homepage banner has been successfully updated.",
            });
        }
    };

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="font-serif text-3xl md:text-4xl">Admin Dashboard</h1>
                <Button variant="outline" className="gap-2">
                    <Package className="w-4 h-4" /> Manage Products
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="w-4 h-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹1,24,500</div>
                        <p className="text-xs text-muted-foreground mt-1 text-green-600 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" /> +12.5% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Orders
                        </CardTitle>
                        <Package className="w-4 h-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">143</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +4 pending shipment
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Top Product
                        </CardTitle>
                        <BarChart3 className="w-4 h-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Alpha Tee</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            89 units sold
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Banner Management */}
                <Card>
                    <CardHeader>
                        <CardTitle>Homepage Banner</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-input rounded-lg p-8 text-center transition-colors hover:border-primary/50 relative overflow-hidden group">
                            {bannerImage ? (
                                <div className="relative aspect-video w-full rounded-md overflow-hidden">
                                    <img src={bannerImage} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white font-medium">Click to Change</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                                        <Upload className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Click to upload new banner</p>
                                        <p className="text-xs text-muted-foreground">AVG, PNG or JPG</p>
                                    </div>
                                </div>
                            )}
                            <Input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleImageUpload}
                                accept="image/*"
                            />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button className="btn-gold">Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Orders Stub */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Order #102{i}</p>
                                        <p className="text-xs text-muted-foreground">Prashant Kumar • 2 items</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">₹2,499</p>
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-green-100 text-green-700">
                                            Paid
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
