import { usePublicNews } from '../hooks/use-public-news';
import { Box, Text, Stack, IconButton, Flex, Portal, Menu, Card, Badge } from '@chakra-ui/react';
import { Contents } from '../../domain/contents';
import { LuAperture, LuTableOfContents } from 'react-icons/lu';
import { usePublicContents } from '../hooks/use-public-contents';

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
            <LuAperture size={20} />
          </IconButton>
        ) : (
          <IconButton
            aria-label="Menu"
            variant="ghost"
            onClick={onMenu}
            size="sm"
          >
            <LuAperture size={20} />
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
            <LuTableOfContents size={20} />
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

interface ContentCardProps {
  title: string;
}

export function AProposCard({
  title
}: ContentCardProps) {
  const { content, isLoading, error } = usePublicContents();

  return (
    <Stack>

      {isLoading && content === undefined ? (
        <p>Chargement des contenus...</p>
      ) : null}

      {error !== null ? (
        <p>
          Donnees locales affichees. Synchronisation distante indisponible.
        </p>
      ) : null}

      {!isLoading && content === undefined ? (
        <p>Aucune contenu disponible.</p>
      ) : null}

      {content?.aPropos !== undefined ? (
        <Box>
          <Card.Root>
            <Card.Body gap="2">
              <Card.Title mt="2">{content?.aPropos.title}</Card.Title>
              <Card.Description
                key={content?.aPropos.id}
                className="prose"
                dangerouslySetInnerHTML={{ __html: content?.aPropos.body }}
              >
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Badge>Date de création: {new Date(content?.aPropos.updated).toLocaleDateString('fr-FR')}</Badge>
            </Card.Footer>
          </Card.Root>
        </Box>
      ) : <div></div>}

    </Stack>
  );
}

export function LegalCard({
  title
}: ContentCardProps) {
  const { content, isLoading, error } = usePublicContents();

  return (
    <Stack>

      {isLoading && content === undefined ? (
        <p>Chargement des contenus...</p>
      ) : null}

      {error !== null ? (
        <p>
          Donnees locales affichees. Synchronisation distante indisponible.
        </p>
      ) : null}

      {!isLoading && content === undefined ? (
        <p>Aucune contenu disponible.</p>
      ) : null}

      {content?.legal !== undefined ? (
        <Box>
          <Card.Root>
            <Card.Body gap="2">
              <Card.Title mt="2">{content?.legal.title}</Card.Title>
              <Card.Description
                key={content?.legal.id}
                className="prose"
                dangerouslySetInnerHTML={{ __html: content?.legal.body }}
              >
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Badge>Date de création: {new Date(content?.legal.updated).toLocaleDateString('fr-FR')}</Badge>
            </Card.Footer>
          </Card.Root>
        </Box>
      ) : <div></div>}

    </Stack>
  );
}

interface NewsCardProps {
  title: string;
}

export function NewsCard({
  title
}: NewsCardProps) {
  const { items, isLoading, error } = usePublicNews();

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

      <p>{title}</p>

      {items.map((item: Contents) => (
        <Card.Root>
          <Card.Body gap="2">
            <Card.Title mt="2">{item.title}</Card.Title>
            <Card.Description
              key={item.id}
              className="prose"
              dangerouslySetInnerHTML={{ __html: item.body }}
            >
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
  title
}: AgendaProps) {
  return (
    <Card.Root>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Description>
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
      </Card.Footer>
    </Card.Root>
  );
}


export default function PublicPage() {
  return (
    <Box>
      PublicPage
    </Box>
  );
}
