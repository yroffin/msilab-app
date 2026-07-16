import { useState } from "react";
import { usePublicContents } from "../hooks/use-public-contents";
import { useAuth } from "../../infrastructure/session/Authcontext";
import { LuLogOut, LuNewspaper } from "react-icons/lu";
import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  Avatar,
  Separator,
  Button,
  Link,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { LoginOverlay } from "../pages/LoginOverlay";
import { RegisterOverlay } from "../pages/RegisterOverlay";

export function SidebarContent({ user, onNavigate }: {
  user: { name: string } | null;
  onNavigate?: () => void;
}) {
  const { content, isLoading, error } = usePublicContents();

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { logout } = useAuth();

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

      <Box>
        {user ? (
          <>
            <Flex align="center" gap={3} w="full">
              <Avatar.Root size="sm">
                <Avatar.Fallback name={user.name} />
              </Avatar.Root>
              <Text fontSize="sm" fontWeight="medium">
                {user.name}
              </Text>
              <IconButton
                aria-label="Se déconnecter"
                variant="ghost"
                size="sm"
                onClick={logout}
              >
                <LuLogOut size={16} />
              </IconButton>
            </Flex>
          </>
        ) : (
          <VStack align="center" gap={2} w="full">
            <Button cursor="pointer" onClick={() => setLoginOpen(true)}>
              Se connecter
            </Button>
            <Link cursor="pointer" onClick={() => setRegisterOpen(true)}>
              Je n'ai pas de compte
            </Link>
            <LoginOverlay open={loginOpen} onOpenChange={setLoginOpen} />
            <RegisterOverlay open={registerOpen} onOpenChange={setRegisterOpen} />
          </VStack>
        )}
      </Box>
    </Flex>
  );
}
