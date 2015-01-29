module.exports = {
	server: {
		ip: process.env.IP || '0.0.0.0',
		port: process.env.PORT || 8000
	},
	db: {
		conn: "mongodb://127.0.0.1:27017/Ikarus"
	},
	jwtSecret: 'EWsbBHiHQbkjRuM3aGwjn76OKnK2jyH8kRXrRcdEL3v+kxSFmfCKAdXkMByzxelX+9YAMJU0efWosu7WMnrtt5HCbYMguG2sseydq7d8PwjL/AfTHCwtu8FzBsvM+zz2iGw5UMXMiMli4oXu0/OcCjE2O4Q/3zTQmZnqYmIK5jE'
};
