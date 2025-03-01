interface Review {
    id: number;
    name: string;
    content: string;
    rating: number;
}

const initialReviewsData: Omit<Review, "id">[] = [
    { name: "Tran Hoang Trung Anh", content: "This is a great app!", rating: 5 },
    { name: "Bui Phuoc Loc", content: "Good app, but the UI could be improved.", rating: 4 },
    { name: "Phan Quang Khai", content: "I found a few bugs.", rating: 3 },
    { name: "Tran Ngoc Yen Thao", content: "Amazing app for beginners!", rating: 5 },
    { name: "Vo Thanh Nhan", content: "Needs more content.", rating: 4 },
];

export default initialReviewsData;