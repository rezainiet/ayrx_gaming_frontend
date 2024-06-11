import React from 'react';
import { Layout, Typography, Divider, BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Terms = () => {
    return (
        <Layout className="min-h-screen">
            <Content className=" mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg">
                <Title className='font-poppins text-center mb-8' level={1} >Terms and Conditions</Title>

                <Divider />

                <section>
                    <Title className='font-poppins' level={2}>Welcome</Title>
                    <Paragraph className='font-poppins'>
                        Welcome to https://www.onlyhumanity.co.uk. These terms and conditions outline the rules and regulations for the use of our website.
                    </Paragraph>
                    <Paragraph className='font-poppins'>
                        By accessing this website we assume you accept these terms and conditions. Do not continue to use https://www.onlyhumanity.co.uk if you do not agree to take all of the terms and conditions stated on this page.
                    </Paragraph>
                </section>

                <Divider />

                <section>
                    <Title className='font-poppins' level={2}>Cookies</Title>
                    <Paragraph className='font-poppins'>
                        We employ the use of cookies. By accessing https://www.onlyhumanity.co.uk, you agreed to use cookies in agreement with our Privacy Policy.
                    </Paragraph>
                </section>

                <Divider />

                <section>
                    <Title className='font-poppins' level={2}>License</Title>
                    <Paragraph className='font-poppins'>
                        Unless otherwise stated, https://www.onlyhumanity.co.uk and/or its licensors own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may access this from https://www.onlyhumanity.co.uk for your own personal use subjected to restrictions set in these terms and conditions.
                    </Paragraph>
                    <Title className='font-poppins' level={3}>You must not:</Title>
                    <ul className="list-disc pl-8">
                        <li>Republish material from https://www.onlyhumanity.co.uk</li>
                        <li>Sell, rent, or sub-license material from https://www.onlyhumanity.co.uk</li>
                        <li>Reproduce, duplicate, or copy material from https://www.onlyhumanity.co.uk</li>
                        <li>Redistribute content from https://www.onlyhumanity.co.uk</li>
                    </ul>
                </section>

                <Divider />

                <section>
                    <Title className='font-poppins' level={2}>Hyperlinking to our Content</Title>
                    <Paragraph className='font-poppins'>
                        The following organizations may link to our Website without prior written approval:
                    </Paragraph>
                    <ul className="list-disc pl-8">
                        <li>Government agencies</li>
                        <li>Search engines</li>
                        <li>News organizations</li>
                        <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses</li>
                        <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site</li>
                    </ul>
                </section>

                <Divider />

                <section>
                    <Title className='font-poppins' level={2}>iFrames</Title>
                    <Paragraph className='font-poppins'>
                        Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
                    </Paragraph>
                </section>

                <Divider />

                <section>
                    <Title className='font-poppins' level={2}>Content Liability</Title>
                    <Paragraph className='font-poppins'>
                        We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
                    </Paragraph>
                </section>

                <Divider />

                <section>
                    <Title className='font-poppins' level={2}>Your Privacy</Title>
                    <Paragraph className='font-poppins'>
                        Please read Privacy Policy
                    </Paragraph>
                </section>

                <Divider />

                <section>
                    <Title className='font-poppins' level={2}>Reservation of Rights</Title>
                    <Paragraph className='font-poppins'>
                        We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
                    </Paragraph>
                </section>

                <Divider />

                <section>
                    <Title className='font-poppins' level={2}>Removal of links from our website</Title>
                    <Paragraph className='font-poppins'>
                        If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
                    </Paragraph>
                </section>

                <Divider />

                <section>
                    <Title className='font-poppins' level={2}>Disclaimer</Title>
                    <Paragraph className='font-poppins'>
                        To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                    </Paragraph>
                    <ul className="list-disc pl-8">
                        <li>limit or exclude our or your liability for death or personal injury</li>
                        <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation</li>
                        <li>limit any of our or your liabilities in any way that is not permitted under applicable law</li>
                        <li>exclude any of our or your liabilities that may not be excluded under applicable law</li>
                    </ul>
                    <Paragraph className='font-poppins'>
                        The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of statutory duty.
                    </Paragraph>
                    <Paragraph className='font-poppins'>
                        As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
                    </Paragraph>
                </section>

                <BackTop>
                    <div className="bg-blue-500 text-white p-2 rounded-full"><ArrowUpOutlined /></div>
                </BackTop>
            </Content>
        </Layout>
    );
};

export default Terms;
