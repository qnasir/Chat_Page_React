import { Box, Stack } from '@mui/material';
import { faker } from '@faker-js/faker'
import React from 'react'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from './Msgtypes';

const Chat_History = [
    {
      type: "msg",
      message: "Hi 👋🏻, How are ya ?",
      incoming: true,
      outgoing: false,
    },
    {
      type: "divider",
      text: "Today",
    },
    {
      type: "msg",
      message: "Hi 👋 Panda, not bad, u ?",
      incoming: false,
      outgoing: true,
    },
    {
      type: "msg",
      message: "Can you send me an abstarct image?",
      incoming: false,
      outgoing: true,
    },
    {
      type: "msg",
      message: "Ya sure, sending you a pic",
      incoming: true,
      outgoing: false,
    },
  
    {
      type: "msg",
      subtype: "img",
      message: "Here You Go",
      img: faker.image.abstract(),
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      message: "Can you please send this in file format?",
      incoming: false,
      outgoing: true,
    },
  
    {
      type: "msg",
      subtype: "doc",
      message: "Yes sure, here you go.",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "link",
      preview: faker.image.cats(),
      message: "Yep, I can also do that",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "reply",
      reply: "This is a reply",
      message: "Yep, I can also do that",
      incoming: false,
      outgoing: true,
    },
  ];

const Message = () => {

  return (
    <Box p={3}>
        <Stack spacing={3}>
        {Chat_History.map((el) => {
            switch (el.type) {
                case "divider":
                    // Timeline
                    return <Timeline el={el} />

                case "msg":
                    switch (el.subtype) {
                        case "img":
                            // img msg 
                            return <MediaMsg el={el} />

                        case "doc":
                            // Doc msg 
                            return <DocMsg el={el} />

                        case "link":
                            // Link msg 
                            return <LinkMsg el={el} />

                        case "reply":
                            // reply msg 
                            return <ReplyMsg el={el} />
                        
                        default:
                            //Text message
                            return <TextMsg el={el} />

                    }

                    break;

                default:
                    return <></>;
            }
        })}
        </Stack>
    </Box>
  )
}

export default Message