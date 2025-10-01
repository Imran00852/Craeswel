import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";
import { motion } from "framer-motion";

const PresidentMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#f0f4f8",
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#1A365D",
            mb: { xs: 2, sm: 3, md: 4 },
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.2rem" },
          }}
        >
          Founders’ Message
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ width: "100%" }}
      >
        <Card
          sx={{
            width: "100%",
            borderRadius: 4,
            boxShadow: 6,
            background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <CardContent>
            {/* Profile Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: 3,
                mb: 3,
              }}
            >
              {/* First Founder with photo */}
              <Avatar
                src="/image.png"
                alt="Founder"
                sx={{
                  width: { xs: 100, sm: 120, md: 140 },
                  height: { xs: 100, sm: 120, md: 140 },
                  border: "4px solid #e2e8f0",
                  boxShadow: 3,
                }}
              />
              <Box textAlign={{ xs: "center", sm: "left" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#2D3748",
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                  }}
                >
                  Mr. Abdul Rasheed
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#4A5568", fontSize: "0.95rem" }}
                >
                  Founder
                </Typography>

                {/* Second Founder without photo */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#2D3748",
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                    mt: 2,
                  }}
                >
                  Ms. Shazia Nazir
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#4A5568", fontSize: "0.95rem" }}
                >
                  Co-Founder
                </Typography>
              </Box>
            </Box>

            {/* Message */}
            <Typography
              variant="body1"
              sx={{
                color: "#4A5568",
                lineHeight: 1.8,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
                textAlign: "justify",
              }}
            >
              At Craeswel Foundation, our journey is driven by the belief that
              every child deserves education, every woman deserves opportunity,
              and every animal deserves compassion. For over three decades, we
              have witnessed how knowledge and kindness can transform lives and
              uplift entire communities. Together, with your support, we are
              building a future where dignity, hope, and opportunity are within
              everyone’s reach.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default PresidentMessage;
