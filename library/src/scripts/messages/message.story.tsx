/**
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import { StoryHeading } from "@library/storybook/StoryHeading";
import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import { StoryContent } from "@library/storybook/StoryContent";
import Message from "@library/messages/Message";
import { AttachmentErrorIcon } from "@library/icons/fileTypes";
import { messagesClasses } from "@library/messages/messageStyles";
import Translate from "@library/content/Translate";
import { WarningIcon } from "@library/icons/common";
import classNames from "classnames";
import { t } from "@library/utility/appUtils";
import SmartLink from "@library/routing/links/SmartLink";

const story = storiesOf("Messages", module);

const shortMessage = `Something went wrong while contacting the server.`;
const message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit lorem ac dui porta, scelerisque placerat felis finibus.`;
const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit lorem ac dui porta, scelerisque placerat felis finibus. Fusce vitae porttitor augue. Integer sagittis justo vitae nibh aliquet, a viverra ipsum laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.
`;

story.add("Message", () => {
    const classesMessages = messagesClasses();

    return (
        <>
            <StoryContent>
                <StoryHeading>Short messages</StoryHeading>
                <Message
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={shortMessage} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    stringContents={shortMessage}
                />

                <Message
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={shortMessage} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    onCancel={() => {}}
                    stringContents={shortMessage}
                />

                <StoryHeading>Long messages</StoryHeading>
                <Message
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={longMessage} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    stringContents={longMessage}
                />
                <Message
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={longMessage} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    onCancel={() => {}}
                    stringContents={longMessage}
                />

                <StoryHeading>Message with link</StoryHeading>
                <Message
                    contents={
                        <div className={classesMessages.content}>
                            <Translate
                                source="Lorem ipsum dolor sit amet, consectetur adipiscing elit, <0>visit site</0>."
                                c0={content => <SmartLink to="http://www.google.com">{content}</SmartLink>}
                            />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    stringContents={t("Lorem ipsum dolor sit amet, consectetur adipiscing elit, visit site.")}
                />

                <StoryHeading>Message with icon </StoryHeading>
                <Message
                    icon={<WarningIcon className={classNames(classesMessages.icon)} />}
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={"Lorem ipsum dolor sit amet, consectetur"} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    stringContents={t("Lorem ipsum dolor sit amet, consectetur.")}
                />

                <Message
                    icon={<WarningIcon className={classNames(classesMessages.icon)} />}
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={message} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    stringContents={t("Lorem ipsum dolor sit amet, consectetur adipiscing elit, visit site.")}
                />

                <Message
                    icon={<WarningIcon className={classNames(classesMessages.icon)} />}
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={message} />
                            <Translate source={message} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    stringContents={t("Lorem ipsum dolor sit amet, consectetur adipiscing elit, visit site.")}
                />

                <Message
                    title="How do posts get sent to the Spam & Moderation queues How do posts get sent to the Spam & Moderation queues??"
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={message} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    stringContents={t(message)}
                />

                <Message
                    title="How do posts get sent to the Spam & Moderation queues How do posts get sent to the Spam & Moderation queues??"
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={message} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    onCancel={() => {}}
                    stringContents={t(message)}
                />

                <Message
                    icon={<WarningIcon className={classNames(classesMessages.icon)} />}
                    title="How do posts get sent to the Spam & Moderation queues How do posts get sent to the Spam & Moderation queues??"
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={message} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    stringContents={t(message)}
                />

                <Message
                    title="Vanilla Forums"
                    icon={<AttachmentErrorIcon className={classNames(classesMessages.icon)} />}
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={message} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    stringContents={t(message)}
                />

                <Message
                    title="Vanilla Forums"
                    icon={false}
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={message} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    stringContents={t(message)}
                />

                <Message
                    title="Vanilla Forums"
                    icon={false}
                    contents={
                        <div className={classesMessages.content}>
                            <Translate source={message} />
                        </div>
                    }
                    onConfirm={() => {
                        return;
                    }}
                    onCancel={() => {
                        return;
                    }}
                    stringContents={t(message)}
                />
            </StoryContent>
        </>
    );
});
