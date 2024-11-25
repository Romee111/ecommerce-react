import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import GoBack from "@/components/layout/admin/GoBack";
import { useCategories } from "../../../hooks/useCategories";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const UpdateSubCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const {
    getSubCategoryById,
    loadingCategories,
    updateSubCategoryById,
    getCategories,
  } = useCategories();

  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Track the selected category
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories and subcategory details on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryList = await getCategories();
        setCategories(categoryList);

        // Fetch subcategory details
        if (id) {
          const result = await getSubCategoryById(id);
          setSubCategoryName(result.name);
          setCategoryId(result.category);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, getSubCategoryById, getCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedSubCategory = {
        name: subCategoryName,
        // category: categoryId,
      };

      await updateSubCategoryById(id, updatedSubCategory);
      toast({
        title: "Success",
        description: "SubCategory updated successfully!",
        variant: "default",
      });
      navigate("/admin/subcategories"); // Redirect to SubCategories page
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update SubCategory. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating SubCategory:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <GoBack to="/admin/subcategories" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Update SubCategory</CardTitle>
          <CardDescription>
            Modify the details of the selected subcategory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label>SubCategory Name</Label>
                <Input
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  placeholder="Enter subcategory name"
                  required
                />
              </div>

              {/* <div>
                <Label>Category</Label>
                {categories?.length === 0 ? (
                  <div>No categories available</div> // Handle empty state
                ) : (
                  <Select
                    value={categoryId}
                    onValueChange={(value) => setCategoryId(value)}
                    disabled={loadingCategories}
                  >
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue
                        placeholder={
                          categories?.find((cat) => cat._id === categoryId)
                            ?.name || "Select Category"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingCategories ? (
                        <SelectItem>Loading...</SelectItem>
                      ) : (
                        categories?.map((category) => (
                          <SelectItem key={category.slug} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div> */}

              <div>
                <Button
                  type="submit"
                  className="w-50 mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update SubCategory"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateSubCategoryPage;
