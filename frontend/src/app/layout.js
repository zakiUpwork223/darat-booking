"use client";
import Header from "./home/_components/Header";
import Navbar from "./home/_components/Navbar";
import Footer from "./home/_components/Footer";
import Providers from "../../lib/redux/Providers";
import { usePathname, useRouter } from "next/navigation";
import { Box } from "@mui/material";
import Drawer from "../app/utilities/_components/Drawer";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const notShowNavbarFooterRoutes = [
    "/adminpanel",
    "/doctors",
    "/patientdata",
    "/services-provided",
    "/admin-products",
    "/schedule",
    "/discount",
    "/schedule/doctor-schedule",
    "/products",
    "/login",
    "/signup",
    `/schedule/doctor-schedule?id=`,

  ];

  const shouldNotShowNavbarFooter =
    notShowNavbarFooterRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        <Providers>
          {!shouldNotShowNavbarFooter ? (
            <Box>
              <Header />
              <Navbar />
              {children}
              <Footer />
            </Box>
          ) : (
            <Box>
              {pathname === "/login" || pathname === "/signup" ? (
                <Box>{children}</Box>
              ) : (
                <Box>
                  {typeof localStorage !== "undefined" &&
                  localStorage.getItem("role") === "Admin" ? (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        gap: 1,
                        height: "100vh",
                      }}
                    >
                      <Box sx={{ width: "25%", flex: 1, overflowY: "auto" }}>
                        <Drawer />
                      </Box>
                      {children}
                    </Box>
                  ) : (
                    <Box onClick={router.back()}></Box>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Providers>
      </body>
    </html>
  );
}

RootLayout.getLayout = (page) => <RootLayout>{page}</RootLayout>;
