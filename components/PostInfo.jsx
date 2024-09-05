// "use sever";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Input,
  Avatar,
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useLikeStore, useUserStore } from "@/store/initial";
import { Likes, disLikes } from "@/api/getLike";
import { mutate } from "swr";
const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const { user_name, user_Id } = useUserStore((state) => state);
  const { LikeList } = useLikeStore((store) => store);
  const SubmitLike = () => {
   Likes({ user_Id: user_Id, id: project.id });
    mutate(["likes", user_Id]);
  };
  const SubmitDisLike = () => {
    disLikes({ user_Id: user_Id, id: project.id });
    mutate(["likes", user_Id]);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{project?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            <Text>{project?.contents}</Text>
            <HStack>
              {project?.tags.map((skill, index) => (
                <Badge key={skill} colorScheme="blue">
                  {skill}
                </Badge>
              ))}
            </HStack>
            <Text fontSize="sm" color="gray.500">
              마감일: {project?.dueDate ? project?.dueDate : "마감기한 없음"}
            </Text>

            <Divider />

            <Flex justify="space-between" align="center">
              <HStack>
                <Button
                  onClick={
                    LikeList?.includes(project?.id)
                      ? () => SubmitDisLike()
                      : () => SubmitLike()
                  }
                  colorScheme="red"
                  variant="outline"
                >
                  좋아요
                </Button>
              </HStack>
            </Flex>

            <Divider />

            <VStack align="stretch" spacing={3}>
              <Text fontWeight="bold">댓글</Text>
              <HStack>
                <Avatar size="sm" name={user_name} />
                <Input placeholder="댓글을 입력하세요..." />
                <Button color={"ghost"} colorScheme="blue">
                  등록
                </Button>
              </HStack>

              <Box maxH="200px" overflowY="auto">
                <VStack align="stretch" spacing={2}>
                  <Flex>
                    <Avatar size="sm" name="박광열" mr={2} />
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        박광열
                      </Text>
                      <Text fontSize="sm">올때 메로나</Text>
                    </Box>
                  </Flex>
                </VStack>
              </Box>
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button color={"ghost"} colorScheme="blue" mr={3} onClick={onClose}>
            닫기
          </Button>
          <Button variant="ghost">프로젝트 지원하기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectDetailModal;

//  const toast = useToast();
// const handleFollow = () => {
//   setIsFollowing(!isFollowing);
//   toast({
//     title: isFollowing ? "팔로우 취소" : "팔로우 완료",
//     status: "success",
//     duration: 2000,
//     isClosable: true,
//   });
// };
