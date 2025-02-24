interface Review {
    id: number;
    name: string;
    content: string;
    rating: number;
}

const initialReviewsData: Omit<Review, "id">[] = [
    { name: "Nguyen Van A", content: "This is a great app!", rating: 5 },
    { name: "Tran Van B", content: "Good app, but the UI could be improved.", rating: 4 },
    { name: "Le Van C", content: "I found a few bugs.", rating: 3 },
    { name: "Huỳnh Van D", content: "Amazing app for beginners!", rating: 5 },
    { name: "Pham Van E", content: "Needs more content.", rating: 4 },
];

export default initialReviewsData;
