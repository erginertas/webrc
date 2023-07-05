import React, { useEffect, useState } from "react";
import { IconButton, Skeleton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import ContactLists from "./ContactLists";
import ChatContactSearch from "./ChatContactSearch";
import ChatWithAdmin from "./ChatWithAdmin";

const ChatContent = ({
  isFetched,
  handleToggleSidebar,
  selectedId,
  handleReset,
  searchSubmitHandler,
  channelLoading,
  isLoading,
  channelList,
  handleChannelOnClick,
  searchValue,
  setSearchValue,
  handleSearch,
}) => {
  const isAdmin =
    channelList && channelList?.find((item) => item.receiver_type === "admin");
  const handleChatWithAdmin = () => {
    if (isFetched) {
      if (channelList.length === 0 || !isAdmin) {
        return <ChatWithAdmin handleChannelOnClick={handleChannelOnClick} />;
      }
    } else {
      return <Skeleton variant="rantangle" width="100%" height="50px" />;
    }
  };
  return (
    <Stack spacing={2} padding=".5rem" marginTop={{ xs: "20px", md: "0px" }}>
      {handleChatWithAdmin()}
      <ChatContactSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        isLoading={isLoading}
        handleReset={handleReset}
        searchSubmitHandler={searchSubmitHandler}
      />
      <ContactLists
        channelList={channelList}
        handleChannelOnClick={handleChannelOnClick}
        channelLoading={channelLoading}
        selectedId={selectedId}
      />
    </Stack>
  );
};
export default ChatContent;
