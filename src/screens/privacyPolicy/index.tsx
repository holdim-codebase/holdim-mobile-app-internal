import * as React from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'

import ArrowBack from '../../assets/images/svg/ArrowBackV2.svg'

import styles from './styles'

function PrivacyPolicyScreen({navigation}: any) {
  return (
    <View style={styles.privacyPolicyWrapper}>
      <View style={styles.privacyPolicyStatusBar} />
      <View style={styles.privacyPolicyStatusBarWrapper}>
        <View>
          <TouchableOpacity
            style={styles.privacyPolicyStatusBarArrow}
            onPress={() => navigation.navigate('Settings')}>
            <ArrowBack />
          </TouchableOpacity>
        </View>
        <Text style={styles.privacyPolicyStatusBarText}>Privacy policy</Text>
      </View>
      <ScrollView style={styles.privacyPolicyContentWrapper}>
        <View style={styles.privacyPolicyDateWrapper}>
          <Text style={styles.privacyPolicyDateText}>
            Last update: 28.11.2022
          </Text>
        </View>
        <Text style={styles.privacyPolicyTitle}>Privacy Policy for Holdim</Text>
        <Text style={styles.privacyPolicyText}>
          At Holdim, accessible from https://holdim.to/, one of our main
          priorities is the privacy of our visitors. This Privacy Policy
          document contains types of information that is collected and recorded
          by Holdim and how we use it If you have additional questions or
          require more information about our Privacy Policy, do not hesitate to
          contact us This Privacy Policy applies only to our online activities
          and is valid for visitors to our website with regards to the
          information that they shared and/or collect in Holdim. This policy is
          not applicable to any information collected offline or via channels
          other than this website. Our Privacy Policy was created with the help
          of the{' '}
          <Text style={styles.privacyPolicyHighlightedText}>
            Free Privacy Policy Generator.
          </Text>
        </Text>
        <Text style={styles.privacyPolicyTitle}>Consent</Text>
        <Text style={styles.privacyPolicyText}>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </Text>
        <Text style={styles.privacyPolicyTitle}>Information we collect</Text>
        <Text style={styles.privacyPolicyText}>
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information. {`\n\n`}If
          you contact us directly, we may receive additional information about
          you such as your name, email address, phone number, the contents of
          the message and/or attachments you may send us, and any other
          information you may choose to provide.{`\n\n`} When you register for
          an Account, we may ask for your contact information, including items
          such as name, company name, address, email address, and telephone
          number.
        </Text>
        <Text style={styles.privacyPolicyTitle}>
          How we use your information
        </Text>
        <Text style={styles.privacyPolicyText}>
          We use the information we collect in various ways, including to:
          {`\n\n`}
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.privacyPolicyBulletList}>{'\u2022'} </Text>
              <Text style={styles.privacyPolicyText}>
                Provide, operate, and maintain our website
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.privacyPolicyBulletList}>{'\u2022'} </Text>
              <Text style={styles.privacyPolicyText}>
                Improve, personalize, and expand our website
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.privacyPolicyBulletList}>{'\u2022'} </Text>
              <Text style={styles.privacyPolicyText}>
                Understand and analyze how you use our website
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.privacyPolicyBulletList}>{'\u2022'} </Text>
              <Text style={styles.privacyPolicyText}>
                Develop new products, services, features, and functionality
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.privacyPolicyBulletList}>{'\u2022'} </Text>
              <Text style={styles.privacyPolicyText}>
                Communicate with you, either directly or through one of our
                partners, including for customer service, to provide you with
                updates and other information relating to the website, and for
                marketing and promotional purposes
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.privacyPolicyBulletList}>{'\u2022'} </Text>
              <Text style={styles.privacyPolicyText}>Send you emails </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.privacyPolicyBulletList}>{'\u2022'} </Text>
              <Text style={styles.privacyPolicyText}>
                Find and prevent fraud
              </Text>
            </View>
          </View>
        </Text>
        <Text style={styles.privacyPolicyTitle}>Log Files</Text>
        <Text style={styles.privacyPolicyText}>
          Holdim follows a standard procedure of using log files. These files
          log visitors when they visit websites. All hosting companies do this
          and a part of hosting services' analytics. The information collected
          by log files include internet protocol (IP) addresses, browser type,
          Internet Service Provider (ISP), date and time stamp, referring/exit
          pages, and possibly the number of clicks. These are not linked to any
          information that is personally identifiable. The purpose of the
          information is for analyzing trends, administering the site, tracking
          users' movement on the website, and gathering demographic information.
        </Text>
        <Text style={styles.privacyPolicyTitle}>Cookies and Web Beacons</Text>
        <Text style={styles.privacyPolicyText}>
          Like any other website, Holdim uses 'cookies'. These cookies are used
          to store information including visitors' preferences, and the pages on
          the website that the visitor accessed or visited. The information is
          used to optimize the users' experience by customizing our web page
          content based on visitors' browser type and/or other information.
        </Text>
        <Text style={styles.privacyPolicyTitle}>
          Advertising Partners Privacy Policies
        </Text>
        <Text style={styles.privacyPolicyText}>
          You may consult this list to find the Privacy Policy for each of the
          advertising partners of Holdim. {`\n\n`}Third-party ad servers or ad
          networks uses technologies like cookies, JavaScript, or Web Beacons
          that are used in their respective advertisements and links that appear
          on Holdim, which are sent directly to users' browser. They
          automatically receive your IP address when this occurs. These
          technologies are used to measure the effectiveness of their
          advertising campaigns and/or to personalize the advertising content
          that you see on websites that you visit. {`\n\n`}Note that Holdim has
          no access to or control over these cookies that are used by
          third-party advertisers.
        </Text>
        <View style={styles.bottomPart} />
      </ScrollView>
    </View>
  )
}

export default PrivacyPolicyScreen
