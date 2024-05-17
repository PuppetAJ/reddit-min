import React, { useState, useEffect } from 'react';
import { markdownToHtml } from '../../helpers/markdownParser';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {
  ExternalLinkIcon,
  ThickArrowUpIcon,
  ThickArrowDownIcon,
  ChatBubbleIcon,
  DrawingPinFilledIcon,
} from '@radix-ui/react-icons';
import shortNumber from 'short-number';
import VideoWrapper from '../../components/VideoWrapper/VideoWrapper';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { IoLogoReddit } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function ThreadPostCard({ post, click }) {
  const navigate = useNavigate();
  const [voted, setVoted] = useState(null);
  const [onlyTitle, setOnlyTitle] = useState(false);
  const [showSpoiler, setShowSpoiler] = useState(false);
  let postText = post.data.selftext;
  const parsedData = markdownToHtml(postText);
  let galleryData = [];
  let video;

  const setTime = (postTime) => {
    if (!postTime) return;
    TimeAgo.addLocale(en);
    let timeAgo = new TimeAgo('en-US');
    return timeAgo.format(new Date(postTime * 1000));
  };

  if (post.data.is_gallery) {
    galleryData = post.data.gallery_data.items.map((item) => {
      return post.data.media_metadata[item.media_id].s.u;
    });
  }

  if (post.data.is_video) {
    video = {
      dashManifest: post.data.media.reddit_video.dash_url,
      hls: post.data.media.reddit_video.hls_url,
      fallback: post.data.media.reddit_video.fallback_url,
    };
  }

  useEffect(() => {
    if (
      post.data &&
      post.data.selftext === '' &&
      !post.data.post_hint &&
      !post.data.is_gallery &&
      !post.data.is_video
    ) {
      setOnlyTitle(true);
    }
  }, [post.data, setOnlyTitle]);

  const handleSubClick = () => {
    navigate('/r/' + post.data.subreddit);
  };

  const handlePostClick = (e) => {
    const endpoint = post.data.permalink;

    navigate(endpoint);
  };

  return (
    <div className='thread-card' style={{ fontFamily: 'Quicksand' }}>
      {post && post.data && (
        <>
          <div className='post-container'>
            {post.data.post_hint !== 'link' && (
              <div className='post-head'>
                <div className='post-stats'>
                  <div className='head-left'>
                    <IoLogoReddit className='reddit-icon' />
                    <div>
                      <h4
                        onClick={handleSubClick}
                        className={click ? 'pointer' : null}
                      >
                        {post.data.subreddit_name_prefixed}
                      </h4>
                      <h5>
                        <span className='posted-by'>posted by</span> u/
                        {post.data.author}
                      </h5>
                    </div>
                  </div>
                  <div className='head-right'>
                    {post.data.stickied && (
                      <DrawingPinFilledIcon
                        width='1.125rem'
                        height='1.125rem'
                        className='pin-icon'
                      />
                    )}
                    <h5>{setTime(post.data.created_utc)}</h5>
                  </div>
                </div>
                <h3
                  className={click ? 'pointer' : null}
                  onClick={click ? handlePostClick : null}
                >
                  {post.data.title}
                </h3>
                {post.data.link_flair_background_color &&
                  post.data.link_flair_type === 'richtext' && (
                    <div
                      style={{
                        backgroundColor: post.data.link_flair_background_color,
                        color:
                          post.data.link_flair_text_color === 'dark'
                            ? 'black'
                            : 'white',
                      }}
                      className='link-flair'
                    >
                      <div className='richtext-wrapper'>
                        {post.data.link_flair_richtext.map((item, i) => {
                          if (item.e === 'text') {
                            return <p key={i}>{item.t}</p>;
                          } else if (item.e === 'emoji') {
                            return (
                              <img
                                key={i}
                                className='link-flair-icon'
                                src={item.u}
                                alt='emoji'
                              />
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  )}
                {post.data.link_flair_background_color &&
                  post.data.link_flair_type === 'text' && (
                    <div
                      style={{
                        backgroundColor: post.data.link_flair_background_color,
                        color:
                          post.data.link_flair_text_color === 'dark'
                            ? 'black'
                            : 'white',
                      }}
                      className='link-flair'
                    >
                      <p>{post.data.link_flair_text}</p>
                    </div>
                  )}
              </div>
            )}

            {/* Default rendering (when things are clickable) */}
            {post.data.post_hint !== 'link' &&
              !onlyTitle &&
              !post.data.spoiler &&
              click && (
                <div className='post-content-wrapper'>
                  {post.data.preview && !post.data.is_video && (
                    <div className='image-wrapper'>
                      <img
                        className='image'
                        src={post.data.preview.images[0].source.url}
                        alt={'post preview.'}
                      />
                    </div>
                  )}
                  {post.data.is_video && <VideoWrapper video={video} />}
                  {post.data.is_gallery && (
                    // <div className="image-wrapper">
                    <Carousel showThumbs={false}>
                      {galleryData.map((item, i) => (
                        <div className='gallery-image-wrapper' key={i}>
                          <img
                            className='gallery-image'
                            src={item}
                            alt='gallery item'
                          />
                        </div>
                      ))}
                    </Carousel>
                    // </div>
                  )}

                  {postText && (
                    <div
                      className='post-text'
                      dangerouslySetInnerHTML={{ __html: parsedData }}
                    ></div>
                  )}
                </div>
              )}
            {post.data.post_hint === 'link' && !post.data.spoiler && click && (
              <div className='post-hyperlink'>
                <div className='post-head-hyper'>
                  <div className='post-stats'>
                    <div className='head-left'>
                      <IoLogoReddit className='reddit-icon' />
                      <div>
                        <h4
                          className={click ? 'pointer' : null}
                          onClick={handleSubClick}
                        >
                          {post.data.subreddit_name_prefixed}
                        </h4>
                        <h5>
                          <span className='posted-by'>posted by</span> u/
                          {post.data.author}
                        </h5>
                      </div>
                    </div>
                    <div className='head-right'>
                      <h5>{setTime(post.data.created_utc)}</h5>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className='post-hyperlink-content'
                    href={post.data.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <div>
                      <h3
                        className={click ? 'pointer' : null}
                        onClick={click ? handlePostClick : null}
                      >
                        {post.data.title}
                      </h3>
                      <a href={post.data.url} target='_blank' rel='noreferrer'>
                        {post.data.url.length >= 30 &&
                          post.data.url.slice(0, 30) + '...'}
                        <ExternalLinkIcon className='link-icon' />
                        {/* {post.data.url} */}
                      </a>
                    </div>
                    <div>
                      {post.data.thumbnail.match(
                        // eslint-disable-next-line
                        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
                      ) && (
                        <div className='thumbnail'>
                          <img src={post.data.thumbnail} alt='thumbnail' />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Spoiler rendering */}
            {post.data.post_hint !== 'link' &&
              !onlyTitle &&
              post.data.spoiler &&
              showSpoiler && (
                <div className='post-content-wrapper'>
                  {post.data.preview && !post.data.is_video && (
                    <div className='image-wrapper'>
                      <img
                        className='image'
                        src={post.data.preview.images[0].source.url}
                        alt={'post preview.'}
                      />
                    </div>
                  )}
                  {post.data.is_video && <VideoWrapper video={video} />}
                  {post.data.is_gallery && (
                    // <div className="image-wrapper">
                    <Carousel showThumbs={false}>
                      {galleryData.map((item, i) => (
                        <div className='gallery-image-wrapper' key={i}>
                          <img
                            className='gallery-image'
                            src={item}
                            alt='gallery item'
                          />
                        </div>
                      ))}
                    </Carousel>
                    // </div>
                  )}

                  {postText && (
                    <div
                      className='post-text'
                      dangerouslySetInnerHTML={{ __html: parsedData }}
                    ></div>
                  )}
                </div>
              )}
            {post.data.post_hint === 'link' &&
              post.data.spoiler &&
              showSpoiler && (
                <div className='post-hyperlink'>
                  <div className='post-head-hyper'>
                    <div className='post-stats'>
                      <div className='head-left'>
                        <IoLogoReddit className='reddit-icon' />
                        <div>
                          <h4
                            className={click ? 'pointer' : null}
                            onClick={handleSubClick}
                          >
                            {post.data.subreddit_name_prefixed}
                          </h4>
                          <h5>
                            <span className='posted-by'>posted by</span> u/
                            {post.data.author}
                          </h5>
                        </div>
                      </div>
                      <div className='head-right'>
                        <h5>{setTime(post.data.created_utc)}</h5>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      className='post-hyperlink-content'
                      href={post.data.url}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <div>
                        <h3
                          className={click ? 'pointer' : null}
                          onClick={click ? handlePostClick : null}
                        >
                          {post.data.title}
                        </h3>
                        <a
                          href={post.data.url}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {post.data.url.length >= 30 &&
                            post.data.url.slice(0, 30) + '...'}
                          <ExternalLinkIcon className='link-icon' />
                          {/* {post.data.url} */}
                        </a>
                      </div>
                      <div>
                        {post.data.thumbnail.match(
                          // eslint-disable-next-line
                          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
                        ) && (
                          <div className='thumbnail'>
                            <img src={post.data.thumbnail} alt='thumbnail' />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* Render full content when on thread route (the route where all click events are disabled) */}
            {post.data.post_hint !== 'link' && !onlyTitle && !click && (
              <div className='post-content-wrapper'>
                {post.data.preview && !post.data.is_video && (
                  <div className='image-wrapper'>
                    <img
                      className='image'
                      src={post.data.preview.images[0].source.url}
                      alt={'post preview.'}
                    />
                  </div>
                )}
                {post.data.is_video && <VideoWrapper video={video} />}
                {post.data.is_gallery && (
                  // <div className="image-wrapper">
                  <Carousel showThumbs={false}>
                    {galleryData.map((item, i) => (
                      <div className='gallery-image-wrapper' key={i}>
                        <img
                          className='gallery-image'
                          src={item}
                          alt='gallery item'
                        />
                      </div>
                    ))}
                  </Carousel>
                  // </div>
                )}

                {postText && (
                  <div
                    className='post-text'
                    dangerouslySetInnerHTML={{ __html: parsedData }}
                  ></div>
                )}
              </div>
            )}
            {post.data.post_hint === 'link' && !click && (
              <div className='post-hyperlink'>
                <div className='post-head-hyper'>
                  <div className='post-stats'>
                    <div className='head-left'>
                      <IoLogoReddit className='reddit-icon' />
                      <div>
                        <h4
                          className={click ? 'pointer' : null}
                          onClick={handleSubClick}
                        >
                          {post.data.subreddit_name_prefixed}
                        </h4>
                        <h5>
                          <span className='posted-by'>posted by</span> u/
                          {post.data.author}
                        </h5>
                      </div>
                    </div>
                    <div className='head-right'>
                      <h5>{setTime(post.data.created_utc)}</h5>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className='post-hyperlink-content'
                    href={post.data.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <div>
                      <h3
                        className={click ? 'pointer' : null}
                        onClick={click ? handlePostClick : null}
                      >
                        {post.data.title}
                      </h3>
                      <a href={post.data.url} target='_blank' rel='noreferrer'>
                        {post.data.url.length >= 30 &&
                          post.data.url.slice(0, 30) + '...'}
                        <ExternalLinkIcon className='link-icon' />
                        {/* {post.data.url} */}
                      </a>
                    </div>
                    <div>
                      {post.data.thumbnail.match(
                        // eslint-disable-next-line
                        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
                      ) && (
                        <div className='thumbnail'>
                          <img src={post.data.thumbnail} alt='thumbnail' />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='post-footer'>
            <div className='post-footer-content'>
              <div className='post-footer-stats'>
                <div className='footer-wrapper'>
                  <div
                    className='vote-wrapper'
                    onClick={(e) => {
                      if (e.target.classList.contains('upvote')) {
                        if (
                          voted &&
                          voted !== e.target &&
                          voted.classList.contains('voted')
                        ) {
                          voted.classList.toggle('voted');
                        }
                        e.target.classList.toggle('voted');
                        setVoted(e.target);
                      } else {
                        if (
                          voted &&
                          voted !== e.target.parentElement &&
                          voted.classList.contains('voted')
                        ) {
                          voted.classList.toggle('voted');
                        }
                        e.target.parentElement.classList.toggle('voted');
                        setVoted(e.target.parentElement);
                      }
                    }}
                  >
                    <ThickArrowUpIcon
                      className='upvote'
                      width={'1.25rem'}
                      height={'1.25rem'}
                    />
                  </div>

                  <p className='votes'>
                    {shortNumber(post.data.ups - post.data.downs)}
                  </p>
                  <div
                    className='vote-wrapper'
                    onClick={(e) => {
                      if (e.target.classList.contains('downvote')) {
                        if (
                          voted &&
                          voted !== e.target &&
                          voted.classList.contains('voted')
                        ) {
                          voted.classList.toggle('voted');
                        }
                        e.target.classList.toggle('voted');
                        setVoted(e.target);
                      } else {
                        if (
                          voted &&
                          voted !== e.target.parentElement &&
                          voted.classList.contains('voted')
                        ) {
                          voted.classList.toggle('voted');
                        }
                        e.target.parentElement.classList.toggle('voted');
                        setVoted(e.target.parentElement);
                      }
                    }}
                  >
                    <ThickArrowDownIcon
                      className='downvote'
                      width={'1.25rem'}
                      height={'1.25rem'}
                    />
                  </div>
                </div>
                <div
                  className={
                    click ? 'footer-wrapper pointer' : 'footer-wrapper'
                  }
                  onClick={click ? handlePostClick : null}
                >
                  <ChatBubbleIcon
                    className='comments-icon'
                    width={'1.25rem'}
                    height={'1.25rem'}
                  />
                  <p className='comments'>
                    {shortNumber(post.data.num_comments)}
                  </p>
                </div>
              </div>
              {click && post.data.spoiler && !post.data.stickied && (
                <div
                  onClick={(e) => {
                    setShowSpoiler(true);
                    const closest = e.target.closest('.post-spoiler-content');
                    closest.style.display = 'none';
                  }}
                  className='post-spoiler-content'
                >
                  <div className='post-spoiler-icon'>
                    <p>Show Spoiler</p>
                  </div>
                </div>
              )}
              <div className='invis'></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ThreadPostCard;
