export interface LostItem {
  _id: string;
  itemName: string;
  description: string;
  imgFileName: string;
  dateUploaded: string;
  itemType: string;
  color: string;
  brand: string;
  schoolFoundIn: string;
  currentLocation: string;
  postedBy: string;
  claimedBy: string | null;
  adminApproved: boolean;
  inquiries: Inquiry[]
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  school: string;
  grade: string;
  bio: string;
  role: string;
  joinDate: string;
  postedItems: string[];
}

export interface Inquiry {
  inquirerId: string;
  receiverId: string;
  dateSent: string;
  content: string;
}