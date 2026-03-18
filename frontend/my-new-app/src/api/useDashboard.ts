// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export const useDashboard = () => {
//   return useQuery({
//     queryKey: ["dashboard"],
//     queryFn: async () => {
//       // 192.168.x.x — это IP твоего компа в локалке для Android
//       const { data } = await axios.get(
//         "http://192.168.0.10:8080/api/v1/dashboard",
//       );
//       return data;
//     },
//   });
// };
