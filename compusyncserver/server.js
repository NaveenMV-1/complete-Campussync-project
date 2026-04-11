const express = require('express');
const cors = require('cors');
const myschema = require('./compusyncdatabase/modal');  
const mysql2 = require('mysql2');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello from ramya");
    res.end();
});




// --- SETUP DB ROUTE ---
app.get("/setupdb", (req, res) => {
    const dropQueries = [
        "DROP TABLE IF EXISTS leavetable",
        "DROP TABLE IF EXISTS odtable",
        "DROP TABLE IF EXISTS issuestable",
        "DROP TABLE IF EXISTS announcementstable",
        "DROP TABLE IF EXISTS attendancetable",
        "DROP TABLE IF EXISTS cgpatable"
    ];
    
    const createLeaves = `CREATE TABLE leavetable (
        id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), reg VARCHAR(255),
        ltype VARCHAR(255), sdata VARCHAR(255), edata VARCHAR(255), lreason TEXT, 
        status VARCHAR(50) DEFAULT 'Pending', attendance INT DEFAULT 90, cgpa FLOAT DEFAULT 8.0
    )`;
    const createODs = `CREATE TABLE odtable (
        id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), reg VARCHAR(255),
        odtype VARCHAR(255), oddate VARCHAR(255), odreason TEXT, 
        status VARCHAR(50) DEFAULT 'Pending', attendance INT DEFAULT 90, cgpa FLOAT DEFAULT 8.0
    )`;
    const createIssues = `CREATE TABLE issuestable (
        id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), reg VARCHAR(255),
        issuetype VARCHAR(255), title VARCHAR(255), reason TEXT, 
        status VARCHAR(50) DEFAULT 'Open'
    )`;
    const createAnnouncements = `CREATE TABLE announcementstable (
        id INT AUTO_INCREMENT PRIMARY KEY, role VARCHAR(255), author VARCHAR(255),
        title VARCHAR(255), content TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    const createAttendance = `CREATE TABLE attendancetable (
        id INT AUTO_INCREMENT PRIMARY KEY, class_section VARCHAR(255), subject VARCHAR(255),
        date VARCHAR(255), period VARCHAR(255), present_count INT, absent_count INT, 
        total INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    const createCgpa = `CREATE TABLE cgpatable (
        id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), reg VARCHAR(255),
        semester INT, gpa FLOAT, total_credits INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    try {
        dropQueries.forEach(q => myschema.query(q));
        myschema.query(createLeaves);
        myschema.query(createODs);
        myschema.query(createIssues);
        myschema.query(createAnnouncements);
        myschema.query(createAttendance);
        myschema.query(createCgpa);
        res.status(200).json({ message: "Database tables created successfully! You can now use the app normally." });
    } catch(err) {
        res.status(500).json({ error: "Failed to setup DB." });
    }
});


// --- LEAVE ENDPOINTS ---
app.post("/leave", async(req,res)=>{
    try{
        const { name, reg, ltype, sdata, edata, lreason } = req.body;
        // Provide defaults if frontend hasn't been updated yet
        const stdName = name || 'Arun Kumar';
        const stdReg = reg || '9123...001';
        
        const fdata = [stdName, stdReg, ltype, sdata, edata, lreason];
        console.log("Received leave application:", fdata);
        
        if (!ltype || !sdata || !edata || !lreason) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        const myquery = "INSERT INTO leavetable (name, reg, ltype, sdata, edata, lreason) VALUES (?, ?, ?, ?, ?, ?)";
        myschema.query(myquery, fdata, (err, result) => {
            if (err) return res.status(500).json({ error: 'Failed to submit leave application' });
            res.status(200).json({ message: 'Leave application submitted successfully' });
        });
    } catch(err) {
        res.status(500).json({ error: 'Database connection error' });
    }
});

app.get("/getleaves", (req, res) => {
    myschema.query("SELECT * FROM leavetable ORDER BY id DESC", (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch data' });
        res.status(200).json(results);
    });
});

app.put("/leave/:id/status", (req, res) => {
    const { status } = req.body;
    myschema.query("UPDATE leavetable SET status = ? WHERE id = ?", [status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to update status' });
        res.status(200).json({ message: 'Status updated successfully' });
    });
});


// --- OD ENDPOINTS ---
app.post("/OD", async(req,res)=>{
    try{
        const { name, reg, odtype, oddate, odreason } = req.body;
        const stdName = name || 'Arun Kumar';
        const stdReg = reg || '9123...001';

        const fdata = [stdName, stdReg, odtype, oddate, odreason];
        console.log("Received on-duty application:", fdata);
        
        if (!odtype || !oddate || !odreason) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        const myquery = "INSERT INTO odtable (name, reg, odtype, oddate, odreason) VALUES (?, ?, ?, ?, ?)";
        myschema.query(myquery, fdata, (err, result) => {
            if (err) return res.status(500).json({ error: 'Failed to submit on-duty application' });
            res.status(200).json({ message: 'On-Duty application submitted successfully' });
        });
    } catch(err) {
        res.status(500).json({ error: 'Database connection error' });
    }
});

app.get("/getods", (req, res) => {
    myschema.query("SELECT * FROM odtable ORDER BY id DESC", (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch data' });
        res.status(200).json(results);
    });
});

app.put("/OD/:id/status", (req, res) => {
    const { status } = req.body;
    myschema.query("UPDATE odtable SET status = ? WHERE id = ?", [status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to update status' });
        res.status(200).json({ message: 'Status updated successfully' });
    });
});


// --- ISSUES ENDPOINTS ---
app.post("/issues", async(req,res)=>{
    try{
        const { name, reg, issuetype, title, reason } = req.body;
        const stdName = name || 'Arun Kumar';
        const stdReg = reg || '9123...001';

        const fdata = [stdName, stdReg, issuetype, title, reason];
        console.log("Received issue report:", fdata);
        
        if (!issuetype || !title || !reason) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        const myquery = "INSERT INTO issuestable (name, reg, issuetype, title, reason) VALUES (?, ?, ?, ?, ?)";
        myschema.query(myquery, fdata, (err, result) => {
            if (err) return res.status(500).json({ error: 'Failed to submit issue report' });
            res.status(200).json({ message: 'Issue report submitted successfully' });
        });
    } catch(err) {
        res.status(500).json({ error: 'Database connection error' });
    }
});

app.get("/getissues", (req, res) => {
    myschema.query("SELECT * FROM issuestable ORDER BY id DESC", (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch data' });
        res.status(200).json(results);
    });
});

app.put("/issues/:id/status", (req, res) => {
    const { status } = req.body;
    myschema.query("UPDATE issuestable SET status = ? WHERE id = ?", [status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to update status' });
        res.status(200).json({ message: 'Status updated successfully' });
    });
});


// --- ANNOUNCEMENTS ENDPOINTS ---
app.post("/announcements", async(req,res)=>{
    try{
        const { role, author, title, content } = req.body;
        const fdata = [role, author, title, content];
        
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and Content are required' });
        }

        const myquery = "INSERT INTO announcementstable (role, author, title, content) VALUES (?, ?, ?, ?)";
        myschema.query(myquery, fdata, (err, result) => {
            if (err) return res.status(500).json({ error: 'Failed to post announcement' });
            res.status(200).json({ message: 'Announcement posted successfully' });
        });
    } catch(err) {
        res.status(500).json({ error: 'Database connection error' });
    }
});

app.get("/getannouncements", (req, res) => {
    myschema.query("SELECT * FROM announcementstable ORDER BY id DESC", (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch announcements' });
        res.status(200).json(results);
    });
});

app.delete("/announcements/:id", (req, res) => {
    myschema.query("DELETE FROM announcementstable WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to delete announcement' });
        res.status(200).json({ message: 'Announcement deleted successfully' });
    });
});

app.get("/clearannouncements", (req, res) => {
    myschema.query("TRUNCATE TABLE announcementstable", (err, result) => {
        if (err) return res.status(500).send("Oh no! Failed to clear announcements.");
        res.status(200).send("<h1>Successfully wiped all announcements from the database!</h1><p>You can close this tab and refresh your dashboard.</p>");
    });
});

// --- ATTENDANCE ENDPOINTS ---
app.post("/attendance", async(req,res)=>{
    try{
        const { class_section, subject, date, period, present_count, absent_count, total } = req.body;
        const fdata = [class_section, subject, date, period, present_count, absent_count, total];
        
        const myquery = "INSERT INTO attendancetable (class_section, subject, date, period, present_count, absent_count, total) VALUES (?, ?, ?, ?, ?, ?, ?)";
        myschema.query(myquery, fdata, (err, result) => {
            if (err) return res.status(500).json({ error: 'Failed to save attendance' });
            res.status(200).json({ message: 'Attendance saved successfully' });
        });
    } catch(err) {
        res.status(500).json({ error: 'Database connection error' });
    }
});

// --- CGPA ENDPOINTS ---
app.post("/savecgpa", async(req,res)=>{
    try{
        const { name, reg, semester, gpa, total_credits } = req.body;
        const fdata = [name, reg, semester, gpa, total_credits];
        
        const myquery = "INSERT INTO cgpatable (name, reg, semester, gpa, total_credits) VALUES (?, ?, ?, ?, ?)";
        myschema.query(myquery, fdata, (err, result) => {
            if (err) return res.status(500).json({ error: 'Failed to save CGPA' });
            res.status(200).json({ message: 'CGPA saved successfully' });
        });
    } catch(err) {
        res.status(500).json({ error: 'Database connection error' });
    }
});

app.get("/getcgpa", (req, res) => {
    // Note: this gets all CGPAs. In a realistic setup we'd filter by reg via /getcgpa/:reg
    myschema.query("SELECT * FROM cgpatable ORDER BY semester ASC", (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch CGPA' });
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
