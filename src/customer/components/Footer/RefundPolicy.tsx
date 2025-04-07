import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const RefundPolicy = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Refund Policy
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          A legal disclaimer
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The explanations and information provided on this page are only general and high-level
          explanations and information on how to write your own document of a Refund Policy.
          You should not rely on this article as legal advice or as recommendations regarding
          what you should actually do, because we cannot know in advance what are the specific
          refund policies that you wish to establish between your business and your customers.
          We recommend that you seek legal advice to help you understand and to assist you in the
          creation of your own Refund Policy.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          Refund Policy – the basics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Having said that, a Refund Policy is a legally binding document that outlines how you
          handle returns, refunds, and exchanges. It helps manage customer expectations and protects
          your business in case of disputes. A clearly written Refund Policy sets forth the conditions
          under which a customer can return a product, get a refund, or request a replacement.
          <br /><br />
          A clear Refund Policy helps reduce misunderstandings and builds trust with your customers.
          Your customers may feel more confident buying from you knowing exactly what your refund
          procedures are, and you may reduce complaints and chargebacks by setting clear terms.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          What to include in the Refund Policy
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Generally speaking, a Refund Policy often includes details like: the timeframe in which
          customers can request a refund; the condition products must be returned in; whether refunds
          are provided as store credit, replacements, or full money back; who pays for return shipping;
          how long it takes to process refunds; and any items that are non-refundable.
          <br /><br />
          You should tailor the policy to fit your business model and legal requirements in your
          region, and make it easy to understand and accessible on your website.
        </Typography>
      </Box>
    </Box>
  );
};

export default RefundPolicy;
