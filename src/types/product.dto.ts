export interface ProductDTO {
    id: string;
    name: string;
    thumbnail_image: string;
    catalog: string;
    published_date: Date;
    price: number;
    stock_quantity: number;
    
}

export interface ProductDetailDTO {
    id: string;
    name: string;
    thumbnail_image: string;
    catalog: string;
    published_date: Date;
    price: number;
    stock_quantity: number;
    // additional image, video and text descriptions make a ProductDTO into a ProductDetailDTO
    description_text: Array<string>;
    description_images: Array<string>;
    description_videos: Array<string>;
}