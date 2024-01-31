const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/database");
const bodyParser = require("body-parser");

db.authenticate()
  .then(() => {
    console.log("veritabanına bağlandı");
  })
  .catch((e) => {
    console.log("veritabanına bağlanamadı: " + e);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  db.query(
    "select * from users inner join userdetail ON users.id=userdetail.userid"
  )
    .then((results) => {
      res.json(results[0]);
    })
    .catch((e) => {
      console.log("hata: " + e);
    });
});

app.post("/userlogin", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  db.query(
    "SELECT * FROM users inner join userdetail ON users.id=userdetail.userid WHERE email = :email AND password= :password",
    {
      replacements: { email, password },
    }
  )
    .then((results) => {
      console.log(results[0]);
      if (results[0].length > 0) {
        res.json(results[0]);
      } else {
        res.status(201).json({ message: "Oturum Açılamadı", status: false });
      }
    })
    .catch((error) => {
      console.log("hata: " + error);
      res.status(500).json({ error: "Veritabanı hatası" });
    });
});

app.post("/adduser", (req, res) => {
  const { email, firstName, lastName, password, createdAt, updatedAt } =
    req.body;
  console.log(email);

  db.query(
    "INSERT INTO users (email,firstname,lastname,password,createdat,updatedat) VALUES (:email,:firstName,:lastName,:password,:createdAt,:updatedAt)",
    {
      replacements: {
        email,
        firstName,
        lastName,
        password,
        createdAt,
        updatedAt,
      },
    }
  )
    .then(() => {
      res.status(201).json({ message: "Kullanıcı başarıyla eklendi" });
    })
    .catch((e) => {
      console.log("hata: " + e);
      res
        .status(500)
        .json({ error: "Veritabanına kullanıcı eklenirken hata oluştu" });
    });
});

app.get("/menu", (req, res) => {
  db.query("select * from menu")
    .then((results) => {
      res.json(results[0]);
    })
    .catch((e) => {
      console.log("hata: " + e);
    });
});

app.get("/orders", (req, res) => {
  db.query("select * from orders order by orderid desc")
    .then((results) => {
      res.json(results[0]);
    })
    .catch((e) => {
      console.log("hata: " + e);
    });
});

app.get("/monthlysalary", (req, res) => {
  db.query("SELECT getMonthlyRevenue();")
    .then((results) => {
      res.json(results[0]);
    })
    .catch((e) => {
      console.log("hata: " + e);
    });
});

app.get("/weeklysalary", (req, res) => {
  db.query("SELECT getWeeklyRevenue();")
    .then((results) => {
      res.json(results[0]);
    })
    .catch((e) => {
      console.log("hata: " + e);
    });
});

app.get("/dailysalary", (req, res) => {
  db.query(
    "SELECT sum(price) FROM orders WHERE createdAt > CURRENT_DATE - INTERVAL '1 day'"
  )
    .then((results) => {
      res.json(results[0]);
    })
    .catch((e) => {
      console.log("hata: " + e);
    });
});

app.post("/addorder", (req, res) => {
  const { price, createdAt, updatedAt } = req.body;
  db.query(
    "INSERT INTO orders (price,createdAt,updatedAt) VALUES (:price,:createdAt,:updatedAt)",
    {
      replacements: { price, createdAt, updatedAt },
    }
  )
    .then((results) => {
      res.status(201).json({ message: "Sipariş Oluşturuldu", status: true });
    })
    .catch((error) => {
      console.log("hata: " + error);
      res.status(500).json({ error: "Veritabanı hatası" });
    });
});

app.post("/addmenu", (req, res) => {
  const { productname, createdAt, updatedAt, productprice } = req.body;
  console.log(productprice);
  db.query(
    "INSERT INTO menu (productname,productprice,createdAt,updatedAt) VALUES (:productname,:productprice,:createdAt,:updatedAt)",
    {
      replacements: { productname, productprice, createdAt, updatedAt },
    }
  )
    .then((results) => {
      res.status(201).json({ message: "Menüye Eklend", status: true });
    })
    .catch((error) => {
      console.log("hata: " + error);
      res.status(500).json({ error: "Veritabanı hatası" });
    });
});

app.post("/updatemenu", (req, res) => {
  const { productname, createdAt, updatedAt, productprice, productid } =
    req.body;
  console.log(productid);
  db.query(
    "UPDATE menu SET productname=:productname, productprice=:productprice, createdat=:createdAt, updatedat=:updatedAt WHERE productid=:productid",
    {
      replacements: {
        productname,
        productprice,
        createdAt,
        updatedAt,
        productid,
      },
    }
  )
    .then((results) => {
      res.status(201).json({ message: "Menüye Eklend", status: true });
    })
    .catch((error) => {
      console.log("hata: " + error);
      res.status(500).json({ error: "Veritabanı hatası" });
    });
});

app.post("/deletemenu", (req, res) => {
  const { productid } = req.body;
  console.log(productid);
  db.query("DELETE FROM menu WHERE productid=:productid", {
    replacements: {
      productid,
    },
  })
    .then((results) => {
      res.status(201).json({ message: "Menüden Silindi", status: true });
    })
    .catch((error) => {
      console.log("hata: " + error);
      res.status(500).json({ error: "Veritabanı hatası" });
    });
});

app.post("/updateacces", (req, res) => {
  const { userid, userlevel } = req.body;
  db.query("UPDATE userdetail SET userlevel=:userlevel where userid=:userid", {
    replacements: { userid, userlevel },
  })
    .then((results) => {
      res.status(201).json({ message: "Sipariş Oluşturuldu", status: true });
    })
    .catch((error) => {
      console.log("hata: " + error);
      res.status(500).json({ error: "Veritabanı hatası" });
    });
});

app.post("/deleteuser", (req, res) => {
  const { userid } = req.body;

  db.query("DELETE FROM userdetail WHERE userid=:userid", {
    replacements: {
      userid,
    },
  })
    .then((results) => {
      db.query("DELETE FROM users WHERE id=:userid", {
        replacements: {
          userid,
        },
      })
        .then((results) => {
          res.status(201).json({ message: "Kullanıcı Silindi", status: true });
        })
        .catch((error) => {
          console.log("hata: " + error);
          res.status(500).json({ error: "Veritabanı hatası" });
        });
    })
    .catch((error) => {
      console.log("hata: " + error);
      res.status(500).json({ error: "Veritabanı hatası" });
    });
});

app.post("/updateuser", (req, res) => {
  const { email, firstName, lastName, password, createdAt, updatedAt, userid } =
    req.body;
  db.query(
    "UPDATE users SET email=:email,firstname=:firstName,lastname=:lastName,password=:password,createdat=:createdAt,updatedat=:updatedAt where id=:userid",
    {
      replacements: {
        email,
        firstName,
        lastName,
        password,
        createdAt,
        updatedAt,
        userid,
      },
    }
  )
    .then((results) => {
      res.status(201).json({ message: "Sipariş Oluşturuldu", status: true });
    })
    .catch((error) => {
      console.log("hata: " + error);
      res.status(500).json({ error: "Veritabanı hatası" });
    });
});

app.use(cors());

app.listen(3000, () => {
  console.log("3000 portu dinleniyor");
});
