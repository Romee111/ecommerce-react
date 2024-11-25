import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import imageCompression from "browser-image-compression";
import GoBack from "@/components/layout/admin/GoBack";
import { useCategories } from "@/hooks/useCategories";
import { useToast } from "@/hooks/use-toast";

const UpdateCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { toast } = useToast();

  const { getCategoryById, updateCategory } = useCategories();

  const [categoryName, setCategoryName] = useState("");
  // const [description, setDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryImagePreview, setCategoryImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch category details on component mount
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      if (!categoryId) return;

      try {
        const result = await getCategoryById(categoryId);
        setCategoryName(result.name);
        // setDescription(result.description);
        setCategoryImage(result.Image || "");
        setCategoryImagePreview(result.Image || "");
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    fetchCategoryDetails();
  }, [categoryId, getCategoryById]);

  const handleImageUpload = async (file) => {
    const options = {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 360,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject("Error converting file to base64");
        reader.readAsDataURL(compressedFile);
      });
    } catch (error) {
      console.error("Error compressing image:", error);
      throw new Error("Image compression failed");
    }
  };

  const handleCategoryImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await handleImageUpload(file);
      setCategoryImage(base64);
      setCategoryImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedCategory = {
        name: categoryName,
        // description,
        // Image: categoryImage,
      };

      await updateCategory(categoryId, updatedCategory);
      toast({
        title: "Success",
        description: "Category updated successfully!",
        variant: "default",
      });
      navigate("/admin/categories");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <GoBack to="/admin/categories" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Update Category</CardTitle>
          <CardDescription>
            Modify the details of the selected category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label>Category Name</Label>
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  required
                />
              </div>

              {/* <div className="space-y-4">
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a short description"
                  maxLength={200}
                  required
                />
              </div> */}

              {/* <div>
                <Label>Category Image (Optional)</Label>
                <Input type="file" onChange={handleCategoryImageChange} />
                {categoryImagePreview && (
                  <img
                    src={categoryImagePreview}
                    alt="Category Preview"
                    className="w-24 h-24 mt-2"
                  />
                )}
              </div> */}

              <div>
                <Button
                  type="submit"
                  className="w-50 mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Category"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateCategoryPage;
