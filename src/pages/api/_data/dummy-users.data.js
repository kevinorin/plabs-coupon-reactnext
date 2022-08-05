// Types
import { IDummyUser } from "../_types/users.types";

export const dummyAccounts = [
  {
    channelType: "email",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    otp: 123456,
    password: "Passw0rd!",
    walletId: "john.doe",
    userId: "1",
  },
  {
    channelType: "phone",
    firstName: "Jane",
    lastName: "Doe",
    otp: 654321,
    password: "Passw0rd@",
    phone: 1234567890,
    walletId: "jane.doe",
    userId: "2",
  },
];
