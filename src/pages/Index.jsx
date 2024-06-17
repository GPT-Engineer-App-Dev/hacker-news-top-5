import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Input, Box, Link, useColorMode, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((response) => response.json())
      .then((storyIds) => {
        const top5StoryIds = storyIds.slice(0, 5);
        return Promise.all(
          top5StoryIds.map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((response) => response.json())
          )
        );
      })
      .then((stories) => {
        setStories(stories);
        setFilteredStories(stories);
      })
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  useEffect(() => {
    setFilteredStories(
      stories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, stories]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Box alignSelf="flex-end">
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
          />
        </Box>
        <Text fontSize="2xl">Hacker News Top Stories</Text>
        <Input
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredStories.map((story) => (
          <Box key={story.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Text fontSize="lg" fontWeight="bold">
              {story.title}
            </Text>
            <Text>Upvotes: {story.score}</Text>
            <Link href={story.url} color="teal.500" isExternal>
              Read more
            </Link>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;