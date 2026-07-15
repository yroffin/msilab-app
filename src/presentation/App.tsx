import { forwardRef, useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  Drawer,
  Image,
  Separator,
  Avatar,
  useBreakpointValue,
  Stack,
  Portal,
  Group,
} from "@chakra-ui/react";
import { LuMenu, LuNewspaper, LuCalendar, LuMoon, LuSun } from "react-icons/lu";
import { BrowserRouter, Navigate, NavLink, Outlet, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MembersPage from "./pages/MembersPage";
import { AProposCard, LegalCard, NewsCard } from "./pages/PublicPage";
import logo from "/icons/icon.png";
import { useTheme } from "next-themes";
import { usePublicContents } from "./hooks/use-public-contents";

type ToolbarProps = {
  associationName: string;
  onOpenDrawer?: () => void;
};

export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme();
  const colorMode = forcedTheme || resolvedTheme;
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return { colorMode, setColorMode: setTheme, toggleColorMode };
}

export const ColorModeButton = forwardRef<HTMLButtonElement, object>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
      >
        {colorMode === "dark" ? <LuMoon /> : <LuSun />}
      </IconButton>
    );
  }
);

// --- Contenu de la nav, partagé entre sidebar fixe et drawer ---
function ToolbarContent({ associationName, onOpenDrawer }: ToolbarProps) {
  const isLarge = useBreakpointValue({ base: false, lg: true }, { ssr: false });

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="full"
      h="56px"
      px={4}
      borderBottomWidth="1px"
      borderColor="black"
    >
      {/* Logo + nom d'association */}
      <Flex align="center" gap={3}>
        <Image
          src={logo}
          alt=""
          w="64px"
          h="32px"
          aria-hidden
        />
        <Text fontWeight="bold" fontSize="md" truncate>
          {associationName}
        </Text>
      </Flex>

      <Flex>
        <ColorModeButton />

        {/* Bouton drawer : rendu uniquement si on n'est pas en mode large */}
        <IconButton
          aria-label="Ouvrir le menu"
          variant="ghost"
          size="sm"
          onClick={onOpenDrawer}
        >
          <LuMenu size={20} />
        </IconButton>
      </Flex>
    </Flex>)
}

// --- Contenu de la nav, partagé entre sidebar fixe et drawer ---
function SidebarContent({ user, onNavigate }: {
  user: { name: string } | null;
  onNavigate?: () => void;
}) {
  const { content, isLoading, error } = usePublicContents();

  const propos = [
    { label: "A propos", to: "/", icon: LuNewspaper },
    { label: "Mentions légales", to: "/mentions", icon: LuNewspaper }
  ]
  const divers = [
    { label: "Actualités", to: "/news", icon: LuNewspaper }
  ]
  return (
    <Flex h="full" direction="column">
      {/* Zone qui prend tout l'espace disponible */}
      <VStack flex="1" align="stretch">
        <p>L'association</p>

        {propos.map((item) => (
          <NavLink key={item.to} to={item.to} onClick={onNavigate}>
            <Flex
              align="center"
              gap={3}
              px={3}
              py={2}
              borderRadius="sm"
            >
              <item.icon size={18} />
              <Text fontWeight="medium">{item.label}</Text>
            </Flex>
          </NavLink>
        ))}

        <p>Divers</p>

        {divers.map((item) => (
          <NavLink key={item.to} to={item.to} onClick={onNavigate}>
            <Flex
              align="center"
              gap={3}
              px={3}
              py={2}
              borderRadius="sm"
            >
              <item.icon size={18} />
              <Text fontWeight="medium">{item.label}</Text>
            </Flex>
          </NavLink>
        ))}
      </VStack>

      {content?.contactUs !== undefined ? (
        <Box
          key={content?.contactUs.id}
          className="prose"
          dangerouslySetInnerHTML={{ __html: content?.contactUs.body }}
        >
        </Box>
      ) : <Box></Box>}

      <Separator borderColor="white" />

      {/* Reste collé en bas, car la zone au-dessus a "mangé" tout l'espace restant */}
      {/* Zone utilisateur en bas de la nav */}
      <Box>
        {user ? (
          <>
            <Avatar.Root size="sm">
              <Avatar.Fallback name={user.name} />
            </Avatar.Root>
            <Text fontSize="sm" fontWeight="medium">
              {user.name}
            </Text>
          </>
        ) : (
          <Group>
            <Avatar.Root size="sm">
              <Avatar.Fallback />
            </Avatar.Root>
            <NavLink to="/login" onClick={onNavigate}>
              <Text fontSize="sm" fontWeight="medium" textDecoration="underline">
                Se connecter
              </Text>
            </NavLink>
          </Group>
        )}
      </Box>
    </Flex>
  );
}

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
  return (
    <BrowserRouter
      basename="/msilab-app/"
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route element={<AppLayout user={null} />}>
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
