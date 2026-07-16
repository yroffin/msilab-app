import { useState } from "react";
import {
  Box,
  Drawer,
  Stack,
  Portal,
} from "@chakra-ui/react";
import { BrowserRouter, Navigate, NavLink, Outlet, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MembersPage from "./pages/MembersPage";
import { AProposCard, LegalCard, NewsCard } from "./pages/PublicPage";
import { useAuth } from "../infrastructure/session/Authcontext";
import { SidebarContent } from "./components/SidebarContent";
import { ToolbarContent } from "./components/ToolbarContent";

export function AppLayout({ user }: { user: { name: string } | null }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Stack>
      <ToolbarContent
        associationName="MSILab"
        onOpenDrawer={() => setDrawerOpen(true)}
      />
      <Box h="90dvh" w="100%" gap="4">
        <Outlet />
      </Box>

      <Drawer.Root
        placement="start"
        open={drawerOpen}
        onOpenChange={(e) => setDrawerOpen(e.open)}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Navigation</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <SidebarContent user={user} />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Stack>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter
      basename="/msilab-app/"
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route element={<AppLayout user={user} />}>
          {/* Public zone — cached offline by the Service Worker */}
          <Route path="/" element={<AProposCard title="A propos" />} />
          <Route path="/mentions" element={<LegalCard title="Mentions légales" />} />
          <Route path="/news" element={<NewsCard title="News" />} />

          {/* Members zone — requires a valid session; never cached by SW */}
          <Route
            path="/members/*"
            element={
              <PrivateRoute>
                <MembersPage />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
