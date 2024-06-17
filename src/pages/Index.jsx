import React, { useEffect, useState } from "react";
import { Container, Text, VStack, Box, Link, Spinner } from "@chakra-ui/react";
import axios from "axios";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json");
        const topFiveStoryIds = response.data.slice(0, 5);
        const storyPromises = topFiveStoryIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        const storyResponses = await Promise.all(storyPromises);
        setStories(storyResponses.map(res => res.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <VStack spacing={4} overflowY="auto" maxH="80vh" width="100%">
          {stories.map(story => (
            <Box key={story.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Text fontSize="xl" fontWeight="bold">{story.title}</Text>
              <Text>Upvotes: {story.score}</Text>
              <Link href={story.url} color="teal.500" isExternal>Read more</Link>
            </Box>
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Index;