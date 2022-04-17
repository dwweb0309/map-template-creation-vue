<template>
  <div class="home-page">
    <div class="intro px-12">
      <v-row class="intro-container">
        <v-col cols="12" md="6">
          <div class="text-h3 font-weight-bold">
            Substack blogging Thiel Fellow dropout
          </div>
          <small class="font-weight-light my-2">
            Branding thought-leader angel investor. Chamath-like, sketchy venture capitalist. Tech Twitter addicted Stripe Summer Intern.
          </small>
          <div class="mt-8">
            <v-btn color="white">Get Started</v-btn>
            <router-link to="/" class="ml-4 text-decoration-none white--text">More info <v-icon color="white" small>{{ mdiArrowTopRight }}</v-icon> </router-link>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <img src="/images/block-image.png" alt="">
        </v-col>
      </v-row>
    </div>
    <div class="partners py-8 px-12">
      <v-row justify="center" class="partners-container">
        <v-col v-for="(item, i) in partners" :key="i">
          <img
            :src="`/images/partners/${item}`"
            class="mb-4"
            contain
            height="34"
          />
        </v-col>
      </v-row>
    </div>
    <div class="solidity px-12">
      <v-row dense class="solidity-container">
        <v-col cols="12" md="4">
          <img src="/images/solidity/1.svg" alt="" class="mb-8">
          <div class="text-h6">Solidity focused crypto</div>
          <div class="mt-2">
            MVP finishing tech-bro. Ethereum ecosystem-based cloud hosting. Generalist-reading secondary markets buyer.
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <img src="/images/solidity/2.svg" alt="" class="mb-8">
          <div class="text-h6">Solidity focused crypto</div>
          <div class="mt-2">
            MVP finishing tech-bro. Ethereum ecosystem-based cloud hosting. Generalist-reading secondary markets buyer.
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <img src="/images/solidity/3.svg" alt="" class="mb-8">
          <div class="text-h6">Solidity focused crypto</div>
          <div class="mt-2">
            MVP finishing tech-bro. Ethereum ecosystem-based cloud hosting. Generalist-reading secondary markets buyer.
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="block-1 px-12">
      <v-row class="block-1-container">
        <v-col cols="12" md="6">
          <div class="mb-4 text-h4 font-weight-bold">Generalist-reading secondary markets buyer</div>
          <p>Product Hunt posting, digital E-vape tool. South Beach based Roblox gamer. Ryan Hoover-funded weird European NFT startup. Microdosing CryptoPunk rationalist. Tech-loving Tradwife. Microdosing CryptoPunk.</p>
          <p>LTV/CAC focused mentally exhausted startup founders. Friends and Family raising, rationalist Job-seeker VR headset wearable network effect. Hypergrowth activist investor.</p>
        </v-col>
        <v-col cols="12" md="6">
          <img src="/images/block-image.png" alt="">
        </v-col>
      </v-row>
    </div>
    <div class="block-2 px-12">
      <v-row class="block-2-container">
        <v-col cols="12" md="6">
          <img src="/images/block-image.png" alt="">
        </v-col>
        <v-col cols="12" md="6">
          <div class="mb-4 text-h4 font-weight-bold">Tech-loving Tradwife</div>
          <p>Signal boosting esports legend. Techstars windsurfing college drop-out. Generalist-reading secondary markets buyer. Generalist-reading secondary markets buyer. DogeCoin buying growth hacker. Churn increasing product-market fit pivot.</p>
          <p>Direct delivery food buyer frictionless plugin. Signal boosting esports legend. CPG product loving, podcast hosting veteran. San Franciscan contrarian Conference attendee.</p>
          <v-btn color="#222628" dark>Learn more</v-btn>
        </v-col>
      </v-row>
    </div>
    <div class="figure px-12">
      <v-row class="figure-container">
        <v-col cols="12" md="3">
          <div class="heading">1337</div>
          <div class="detail">Defence-contracting Tel Aviv startup accelerator. Nostalgic YikYaking Instagram</div>
        </v-col>
        <v-col cols="12" md="3">
          <div class="heading">$37M</div>
          <div class="detail">Healthcare platform consumer newsletter. Y-combinator Facebook PM. </div>
        </v-col>
        <v-col cols="12" md="3">
          <div class="heading">73%</div>
          <div class="detail">Generalist-reading secondary markets buyer</div>
        </v-col>
        <v-col cols="12" md="3">
          <div class="heading">137k</div>
          <div class="detail">Minecraft-playing Stanford Dropout. Techno-king ride sharing.</div>
        </v-col>
      </v-row>
    </div>
    <div class="direct-delivery px-12">
      <div class="direct-delivery-container">
        <div class="heading">{{ directDelivery.title }}</div>
        <div class="subheading">{{ directDelivery.subtitle }}</div>
        <v-row class="mt-12">
          <v-col v-for="(item, i) in directDelivery.items" :key="i" cols="12" md="3">
            <div class="direct-delivery-items">
              <img :src="`/images/direct-delivery/${i + 1}.svg`" />
              <div class="head">Minecraft-playing Stanford</div>
              <div class="detail">MVP finishing tech-bro. Ethereum ecosystem-based cloud hosting. Generalist-reading secondary</div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="testimonial px-12">
      <div class="testimonial-container">
        <div class="text-h3">We love what you say</div>
        <v-carousel hide-delimiter-background height="300" class="my-12">
          <v-carousel-item
            v-for="(item,i) in testimonials"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-sheet
              height="300"
              color="#1A1A1A"
              dark
              style="padding: 50px 80px;"
            >
              <div class="d-flex flex-column justify-space-between fill-height">
                <div>{{ item.text }}</div>
                <div class="mt">{{ item.autor }}</div>
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
    <div class="blog px-12">
      <div class="blog-container">
        <div class="d-flex align-center justify-space-between py-6">
          <div class="heading">Blog</div>
          <div class="d-flex align-center">
            <span class="font-weight-bold">View all</span>
            <v-icon color="black" size="20">{{ mdiArrowTopRight }}</v-icon>
          </div>
        </div>
        <v-row class="items">
          <v-col v-for="(item, i) in blogs" :key="i" cols="12" md="4">
            <div class="item">
              <img src="/images/block-image.png" alt="" style="width: 100%;">
              <div class="category">{{ item.category }}</div>
              <div class="head">{{ item.title }}</div>
              <p class="body">{{ item.body }}</p>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiArrowTopRight } from '@mdi/js'

export default {
  data: () => ({
    mdiArrowTopRight,

    partners: [
      'twitter.svg',
      'pinterest.svg',
      'google.svg',
      'facebook.svg',
      'youtube.svg'
    ],
    directDelivery: {
      title: 'Direct delivery food buyer frictionless plugin',
      subtitle: 'Tether selling van life hiker. Coinbase competing stealth startup. Google Employee DeFi hacking. Javascript writing capital markets.',
      items: [
        {
          title: 'Minecraft-playing Stanford',
          detail: 'MVP finishing tech-bro. Ethereum ecosystem-based cloud hosting. Generalist-reading secondary'
        }, {
          title: 'Generalistreading secondary',
          detail: 'Generalist-reading secondary markets buyer. PMF-focused, overfunded LIDAR startup.'
        }, {
          title: 'PMF-focused',
          detail: 'San Franciscan contrarian Conference attendee Bessemer passed-on vintage wine collection.'
        }, {
          title: 'San Franciscan contrarian',
          detail: 'Tragically market capped Bitcoin miner. LTV/CAC focused mentally exhausted startup founders.'
        }
      ]
    },
    testimonials: [{
      text: 'Out of touch, ad buying venture investor. Paul Graham backed DeFi degenerate. Javascript writing capital markets. Healthcare platform consumer newsletter. Zoom supported product manager. AngelList reading Beta-tester.',
      autor: 'Katie Ledecky, Denver Co',
      avatar: '1.png'
    }, {
      text: 'Out of touch, ad buying venture investor. Paul Graham backed DeFi degenerate. Javascript writing capital markets. Healthcare platform consumer newsletter. Zoom supported product manager. AngelList reading Beta-tester.',
      autor: 'Dressel, Tampa FL',
      avatar: '2.png'
    }, {
      text: 'SPAC leading Testflight user. Softbank-injected dropbox alternative. Consumer Social underground crypto newsletter. Healthcare platform consumer newsletter. Hypergrowth activist investor.',
      autor: 'Federica Pellegrini',
      avatar: '3.png'
    }],
    blogs: [
      {
        category: 'Real estate',
        title: 'Tether selling van life hiker',
        body: 'Out of touch, ad buying venture investor. Tether selling van life hiker. Techstars windsurfing college drop-out. Satoshi themed Macbook air.'
      }, {
        category: 'Economic',
        title: 'Academia taught Ethereum Shill',
        body: 'SPAC leading Testflight user. Product Hunt posting digital e-vape tool. Academia taught Ethereum Shill. Tether selling van life hiker.'
      }, {
        category: 'Real estate',
        title: 'CBD gummy eating',
        body: 'Branding thought-leader angel investor. Google Employee DeFi hacking. PMF-focused, overfunded LIDAR startup.'
      }
    ]
  })
}
</script>

<style scoped>
  .intro-container,
  .partners-container,
  .solidity-container,
  .block-1-container,
  .block-2-container,
  .figure-container,
  .direct-delivery-container,
  .blog-container {
    max-width: 1400px;
    margin: 0 auto;
    flex-grow: 1;
  }

  .testimonial-container {
    max-width: 680px;
    text-align: center;
    margin: auto;
    padding: 100px 0;
  }

  .home-page {
    color: white;
  }
  .home-page a {
    text-decoration: none;
    color: white;
  }
  .intro {
    height: 500px;
    background: #222628;
    display: flex;
    align-items: center;
  }

  .partners {
    background: #222628;
    display: flex;
    justify-content: space-between;
  }

  .solidity, .block-1, .block-2 {
    color: black;
  }

  /* figure */
  .figure {
    background: #222628;
    margin: 100px 0;
    padding: 60px 0;
  }
  .figure .heading {
    font-weight: 600;
    font-size: 80px;
    line-height: 88px;
    text-align: center;
    margin-bottom: 30px;
  }
  .figure .detail {
    text-align: center;
    color: #C1C4D2;
    font-size: 16px;
    font-weight: 300;
  }

  /* direct delivery */
  .direct-delivery {
    margin: 100px 0;
    color: #242424;
    text-align: center;
  }
  .direct-delivery .heading {
    font-size: 42px;
    line-height: 50px;
    font-weight: 600;
    width: 570px;
    margin: auto;
  }
  .direct-delivery .subheading {
    font-size: 16px;
    font-weight: 400;
    width: 570px;
    margin: 22px auto;
  }
  .direct-delivery-items {
    text-align: left;
    background: #E9EDF2;
    padding: 24px;
  }
  .direct-delivery-items .head {
    color: #242424;
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 12px;
  }
  .direct-delivery-items .detail {
    color: #59657C;
    font-size: 16px;
    font-weight: 400;
  }

  /* testimonial */
  .testimonial {
    background: #222628;
  }

  /* blog */
  .blog {
    color: black;
    padding: 100px 0;
  }
  .blog .heading {
    font-size: 42px;
    font-weight: 600;
  }
  .blog .items .item .category {
    font-size: 14px;
    color: #59657C;
    text-transform: uppercase;
    font-weight: 600;
    margin: 8px 0;
  }
  .blog .items .item .head {
    font-size: 18px;
    font-weight: 600;
    margin: 4px 0;
  }
  .blog .items .item .body {
    font-size: 16px;
    color: #59657C;
  }
  
  .solidity {
    margin: 140px 0;
  }
</style>