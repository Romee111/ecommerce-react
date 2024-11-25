import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { TrashIcon, Edit2 } from "lucide-react";

const OrderTable = ({ orders, loading, cancelOrder, handleOrderAction }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[120px]">Order ID</TableHead>
        <TableHead className="w-[200px]">Product</TableHead>
        <TableHead className="w-[200px]">Discription</TableHead>
        <TableHead className="w-[300px]">Shipping Address</TableHead>
        <TableHead className="w-[150px]">Payment Method</TableHead>
        <TableHead className="w-[150px]">Total Amount</TableHead>
        <TableHead className="w-[100px]">Paid</TableHead>
        <TableHead className="w-[100px]">Delivered</TableHead>
        {/* {role !== "seller" && (
              <TableHead className="w-[100px]">Confirm Order</TableHead>
            )} */}
      </TableRow>
    </TableHeader>
    <TableBody>
      {loading
        ? Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
            </TableRow>
          ))
        : orders?.map((orderItem) => (
            <TableRow key={orderItem._id}>
              {/* Order ID */}
              <TableCell>{orderItem._id}</TableCell>

              {/* User Name */}
              <TableCell>{orderItem?.products[0]?.title.slice(0, 20)}</TableCell>

              {/* Products */}
              <TableCell>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link">View Products</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      {orderItem.products.map((product) => (
                        <div
                          key={product.productId}
                          className="flex justify-between space-x-4"
                        >
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">
                              Product ID:{" "}
                              <Link to={`/products/${product.productId}`}>
                                {product.productId}
                              </Link>
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Price: PKR {product.price}
                            </p>
                            <p className="text-xs">
                              Quantity: {product.quantity}
                            </p>
                            {product.title && (
                              <p className="text-xs">Title: {product.title}</p>
                            )}
                            {product.color && (
                              <p className="text-xs">Color: {product.color}</p>
                            )}
                            {product.size && (
                              <p className="text-xs">Size: {product.size}</p>
                            )}
                            {product.totalProductDiscount && (
                              <p className="text-xs">
                                Discount: PKR {product.totalProductDiscount}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </TableCell>

              {/* Shipping Address */}
              <TableCell>
                {orderItem.shippingAddress.street},{" "}
                {orderItem.shippingAddress.address},{" "}
                {orderItem.shippingAddress.city} -{" "}
                {orderItem.shippingAddress.phone}
              </TableCell>

              {/* Payment Method */}
              <TableCell>{orderItem.paymentMethod}</TableCell>

              {/* Total Amount */}
              <TableCell>PKR {orderItem.totalAmount}</TableCell>

              {/* Is Paid (Styled Tag) */}
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    orderItem.isPaid
                      ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                      : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                  }`}
                >
                  {orderItem.isPaid ? "Paid" : "Unpaid"}
                </span>
              </TableCell>

              {/* Is Delivered (Styled Tag) */}
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    orderItem.isDelivered
                      ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                  }`}
                >
                  {orderItem.isDelivered ? "Delivered" : "Pending"}
                </span>
              </TableCell>
              {/* <TableCell>
                <div className="flex space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        ...
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center"> */}
              {/* <DropdownMenuItem
                        onClick={() =>
                          handleOrderAction({
                            ...orders,
                            payment: "success",
                          })
                        }
                      >
                        Mark Payment as Success
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleOrderAction({
                            ...orders,
                            delivered: "success",
                          })
                        }
                      >
                        Mark as Delivered
                      </DropdownMenuItem> */}
              {/* <DropdownMenuItem
                        onClick={() => cancelOrder(orders._id)}
                        className="text-red-500 text-center cursor-pointer"
                      >
                        Cancel Order
                      </DropdownMenuItem> */}
              {/* </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell> */}
            </TableRow>
          ))}
    </TableBody>
  </Table>
);

export default OrderTable;
