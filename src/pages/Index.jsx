import React from "react";
import { Container, Text, VStack, Link, Spinner, Box, HStack } from "@chakra-ui/react";
import { useQuery } from "react-query";

const fetchTopStories = async () => {
  const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const storyIds = await response.json();
  const top5StoryIds = storyIds.slice(0, 5);

  const storyPromises = top5StoryIds.map(async (id) => {
    const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    return storyResponse.json();
  });

  return Promise.all(storyPromises);
};

const Index = () => {
  const { data, error, isLoading } = useQuery("topStories", fetchTopStories);

  if (isLoading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Text fontSize="2xl" color="red.500">Failed to load stories</Text>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        {data.map((story) => (
          <Box key={story.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <HStack justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bold">{story.title}</Text>
              <Text fontSize="md" color="gray.500">{story.score} upvotes</Text>
            </HStack>
            <Link href={story.url} color="teal.500" isExternal>Read more</Link>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;