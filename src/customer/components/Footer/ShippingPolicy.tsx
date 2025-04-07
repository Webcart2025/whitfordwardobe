import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const ShippingPolicy = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Shipping Policy
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Section 1: A legal disclaimer */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          A legal disclaimer
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The explanations and information provided on this page are only general and high-level explanations and
          information on how to write your own document of a Shipping Policy. You should not rely on this article
          as legal advice or as recommendations regarding what you should actually do, because we cannot know in
          advance what are the specific shipping policies that you wish to establish between your business and your
          customers. We recommend that you seek legal advice to help you understand and to assist you in the creation
          of your own Shipping Policy.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Section 2: Shipping Policy - the basics */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          Shipping Policy – the basics
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Having said that, a Shipping Policy is a legally binding document that is meant to establish the legal
          relations between you and your customers. It is the legal framework for presenting your obligations to
          your customers, but also to address different possible scenarios that may accrue, and what happens in
          each and every case.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          A Shipping Policy is a good practice and it helps both sides – you and your customers. Your customers may
          benefit from being informed about what they can expect from your service. You may benefit because people
          may be likely to shop with you if you have a clear Shipping Policy in place since there won’t be any
          questions about your shipping timeframes or processes.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Section 3: What to include */}
      <Box>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          What to include in the Shipping Policy
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Generally speaking, a Privacy Policy often addresses these types of issues: the types of information the
          website is collecting and the manner in which it collects the data; an explanation about why is the website
          collecting these types of information; what are the website’s practices on sharing the information with
          third parties; ways in which your visitors and customers can exercise their rights according to the relevant
          privacy legislation; the specific practices regarding minors’ data collection; and much more.
        </Typography>
      </Box>
    </Box>
  );
};

export default ShippingPolicy;
