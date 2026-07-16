import { forwardRef } from "react";
import { LuMenu, LuMoon, LuSun } from "react-icons/lu";
import {
  Flex,
  Text,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { useTheme } from "next-themes";
import logo from "/icons/icon.png";

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

type ToolbarProps = {
  associationName: string;
  onOpenDrawer?: () => void;
};

export function ToolbarContent({ associationName, onOpenDrawer }: ToolbarProps) {

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

