import React, {
  AppRegistry,
  View,
} from 'react-native';

import { AppBuilder } from 'shoutem';
import { NavigationBar, CompositeMedia } from 'shoutem.ui';
import themeInit from './themeInit';
import extensions from './extensions.js';

const body = "<p>\n    <attachment id=\"fb14b11c-b6e3-47a8-885f-02f7011b8792\" type=\"image\" xmlns=\"urn:xmlns:shoutem-com:cms:v1\"></attachment>\n</p>\n\n\n<p><a href=\"http://pitchfork.com/artists/3397-prince/news/\">Prince</a>'s albums <i>The Very Best of Prince </i>and <i><a href=\"http://pitchfork.com/news/54836-prince-reissuing-purple-rain-promises-new-music-under-new-warner-bros-deal-releases-new-song/\">Purple Rain</a> </i>have topped the <a href=\"http://www.billboard.com/articles/columns/chart-beat/7341816/prince-number-1-and-2-on-billboard-200-albums-chart-very-best-of-purple-rain-albums\">Billboard</a> 200 Albums Chart, holding the first and second spots respectively. The albums have re-entered the chart in the wake of sales following the icon's <a href=\"http://pitchfork.com/news/64848-prince-dead-at-57/\">death</a> on April 21. This marks the fifth time Prince has achieved a No. 1 album in the United States, and his first since 2006. <i>The Very Best of </i>sold the equivalent of 179,000 albums, 100,000 of which were traditional album sales. <i>Purple Rain </i>moved 69,000 copies, 63,000 of which were traditional sales.</p>\n<p>In other Prince-related record news: In <a href=\"http://kstp.com/news/prince-electric-fetus/4114048/\">an interview</a> with ABC, record shop manager Aaron Meyerring revealed that Prince patronized his store, Electric Fetus, on Record Store Day this year. (This year's RSD took place April 16, just five days before his death.) He bought a copy of Stevie Wonder's <i>Talking Book, </i>and invited Meyerring over to Paisley Park.</p>\n<p>Pitchfork named the title track of <i>Purple Rain</i>'s soundtrack the <a href=\"http://pitchfork.com/features/lists-and-guides/9700-the-200-best-songs-of-the-1980s/\">best song of the 1980s</a>.  Find more on Prince and his legacy <a href=\"http://pitchfork.com/news/tags/prince-remembered/\">here</a>.</p>\n<p>Watch Prince perform at the Super Bowl:</p>\n<p><attachment id=\"2583bb8b-03d7-4d64-9190-b45c1143e696\" type=\"video\" xmlns=\"urn:xmlns:shoutem-com:cms:v1\"></attachment></p>";

const attachments = {
        "images": [
            {
                "type": "image",
                "id": "34f07c0a-dd3a-4151-8551-4f33f0f464ee",
                "src": "http://cdn4.pitchfork.com/news/65041/2ff87515.jpg",
                "thumbnail_url": "http://cdn4.pitchfork.com/news/65041/2ff87515.jpg",
                "width": 790,
                "height": 395
            },
            {
                "type": "image",
                "id": "fb14b11c-b6e3-47a8-885f-02f7011b8792",
                "src": "http://pitchfork-cdn.s3.amazonaws.com/news/65041/ticker.2ff87515.jpg",
                "thumbnail_url": "http://pitchfork-cdn.s3.amazonaws.com/news/65041/ticker.2ff87515.jpg",
                "width": 648,
                "height": 324,
                "jAttachment": {
                    "0": {},
                    "context": {},
                    "length": 1
                }
            }
        ],
        "videos": [
            {
                "type": "video",
                "id": "2583bb8b-03d7-4d64-9190-b45c1143e696",
                "src": "http://www.youtube.com/v/7NN3gsSf-Ys",
                "thumbnail_url": "http://img.youtube.com/vi/7NN3gsSf-Ys/0.jpg",
                "width": 620,
                "height": 349,
                "jAttachment": {
                    "0": {},
                    "context": {},
                    "length": 1
                }
            }
        ],
        "audio": []
    }

const htmlContent = '<p><a href="http://jsdf.co">&hearts; nice job!</a></p>'
const simpleText = `<p><p><b>first paragraph<\b><br><br><i>Some text about it</i></p><p><em>second paragraph</em></p></p>`;
const parWithImage = `<img src='http://static.adzerk.net/Advertisers/da421b79476a4cf7b891d0c8e65c456b.png' width=200 height=200 />`;
const attachment = `<attachment id="fb14b11c-b6e3-47a8-885f-02f7011b8792" type="image" />`;
const bla = `<bla/>`;
const video = `<attachment id="2583bb8b-03d7-4d64-9190-b45c1143e696" type="video" />`;
function renderNavigationBar(navBarProps) {
  return (
      <View>
      <NavigationBar {...navBarProps} />
      <CompositeMedia
        body={body}
        attachments={attachments}
      />
      </View>
  );
}

const App = new AppBuilder()
  .setExtensions(extensions)
  .setThemeInit(themeInit)
  .setRenderNavigationBar(renderNavigationBar)
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
