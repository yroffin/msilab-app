import { Link } from 'react-router-dom';
import { usePublicNews } from '../hooks/use-public-news';
import { Bleed, Box, Button, Text, Grid, Heading, HStack, Stack, IconButton, Flex, Portal, Menu, Card, SimpleGrid, Container, Wrap, ScrollArea, Badge } from '@chakra-ui/react';
import { Aperture, TableOfContents } from "lucide-react";
import { News } from '../../domain/news';

type TopBarProps = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onMenu?: () => void;
  onNotifications?: () => void;
};

export function TopBar({
  title,
  showBack = false,
  onBack,
  onMenu,
  onNotifications,
}: TopBarProps) {
  return (
    <Flex
      position="sticky"
      top={0}
      align="center"
      zIndex={10000}
      h="64px"
      px={3}
      bgColor="grey"
      borderBottomWidth="1px"
      borderColor="black"
    >
      {/* Zone gauche : retour ou menu */}
      <Box w="40px">
        {showBack ? (
          <IconButton
            aria-label="Retour"
            variant="ghost"
            onClick={onBack}
            size="sm"
          >
            <Aperture size={20} />
          </IconButton>
        ) : (
          <IconButton
            aria-label="Menu"
            variant="ghost"
            onClick={onMenu}
            size="sm"
          >
            <Aperture size={20} />
          </IconButton>
        )}
      </Box>

      {/* Titre centré, tronqué si trop long */}
      <Text
        fontWeight="bold"
        fontSize="md"
        flex="1"
        textAlign="center"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        px={2}
      >
        {title}
      </Text>

      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton>
            <TableOfContents size={20} />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="new-txt">Login</Menu.Item>
              <Menu.Item value="new-file">...</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
}

type WelcomeProps = {
  title: string;
  body: string;
};

export function WelcomeCard({
  title,
  body,
}: WelcomeProps) {
  return (
    <Card.Root>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
      </Card.Footer>
    </Card.Root>
  );
}

interface NewsCardProps {
  title: string;
  items: News[];
  isLoading: boolean;
  error: string | null;
}

export function NewsCard({
  title,
  isLoading,
  error,
  items,
}: NewsCardProps) {
  return (
    <Stack>

      {isLoading && items.length === 0 ? (
        <p>Chargement des news...</p>
      ) : null}

      {error !== null ? (
        <p>
          Donnees locales affichees. Synchronisation distante indisponible.
        </p>
      ) : null}

      {!isLoading && items.length === 0 ? (
        <p>Aucune news disponible.</p>
      ) : null}

      {title}
      {items.map((item: News) => (
        <Card.Root>
          <Card.Body gap="2">
            <Card.Title mt="2">{item.title}</Card.Title>
            <Card.Description>
              <div dangerouslySetInnerHTML={{ __html: item.body }} />
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Badge>Date de création: {new Date(item.updated).toLocaleDateString('fr-FR')}</Badge>
          </Card.Footer>
        </Card.Root>
      ))}
    </Stack>
  );
}

type AgendaProps = {
  title: string;
  body: string;
};

export function AgendaCard({
  title,
  body,
}: AgendaProps) {
  return (
    <Card.Root>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
      </Card.Footer>
    </Card.Root>
  );
}


export default function PublicPage() {
  const { items, isLoading, error } = usePublicNews();

  return (
    <main className="page-shell">
      <Stack>
        <TopBar
          title="MSILAB"
          showBack
          onBack={() => console.log("retour")}
          onNotifications={() => console.log("notifs")}
        />
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <ScrollArea.Content position="sticky" top={8}>
              <WelcomeCard
                title="Fabrique. Innove. Partage."
                body="MSILAB"
              />

              <NewsCard
                title="Agenda"
                isLoading={isLoading}
                error={error}
                items={items}
              />

              <AgendaCard
                title="Agenda"
                body="TODO..."
              />
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>

      </Stack>
    </main>
  );
}
