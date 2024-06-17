import React, { useEffect, useState } from "react";
import { Container, Text, VStack, Link, Spinner, Box, Heading } from "@chakra-ui/react";
import axios from "axios";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json");
        const topStoryIds = response.data.slice(0, 5);
        const storyPromises = topStoryIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        const storyResponses = await Promise.all(storyPromises);
        setStories(storyResponses.map(res => res.data));
      } catch (error) {
        console.error("Error fetching top stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Top 5 Hacker News Stories</Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          stories.map(story => (
            <Box key={story.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Text fontSize="xl" fontWeight="bold">{story.title}</Text>
              <Link href={story.url} color="teal.500" isExternal>Read more</Link>
              <Text>Upvotes: {story.score}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;