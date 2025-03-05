interface Review {
    id: number;
    name: string;
    content: string;
    rating: number;
}

const initialReviewsData: Omit<Review, "id">[] = [
    { name: "Tran Ngoc Yen Thao", content: "Good Design!", rating: 5 },
    { name: "Tran Hoang Trung Anh", content: "Thank you for Design!", rating: 4 },
    { name: "Bui Phuoc Loc", content: "Good but i don't like itit", rating: 3 },
    { name: "Phan Quang Khai", content: "It is really amazing designdesign", rating: 5 },
    { name: "Vo Thanh Nhan", content: "Needs more content.", rating: 4 },
];

export default initialReviewsData;