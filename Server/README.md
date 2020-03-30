# Fancy To-Do

An Simple Todo Application with some features:
- Created Todo
- Show List of created Todos
- Show created Todo with specific ID
- Update created Todo
- Delete Todo



# Server

### **`POST /todos`**

`Add New data of Todos`

_Request Header_
```
Empty
```

_Request Body_
```
{
    "id": 2,
    "title": "Jalan dulu keluar Kostan",
    "description": "Tukang Mie ayamnya ga di dalem kamar, butuh effort dikit jalan laa",
    "status": false,
    "due_date": "2020-03-30"
}
```

_Response (200)_
```
{
    "todo": {
        "id": 2,
        "title": "Jalan dulu keluar Kostan",
        "description": "Tukang Mie ayamnya ga di dalem kamar, butuh effort dikit jalan laa",
        "status": false,
        "due_date": "2020-03-30",
        "updatedAt": "2020-03-30T09:51:22.676Z",
        "createdAt": "2020-03-30T09:51:22.676Z"
    }
}
```

_Response (400) | Bad Request_
```
{
    "messege": "Invalid Input, Please try again"
}
```
-----



### **`GET /todos`**

`Find All List of Todos`

_Request Header_
```
Empty
```

_Request Body_
```
Empty
```

_Response (200)_
```
{
    "todos": [
        {
            "id": 1,
            "title": "Makan Mie Ayam",
            "description": "Beli Mie Ayam dulu di depan kost, baru bisa makan",
            "status": false,
            "due_date": "2020-03-30",
            "createdAt": "2020-03-30T09:51:22.676Z",
            "updatedAt": "2020-03-30T09:51:22.676Z"
        },{
            "id": 2,
            "title": "Jalan dulu keluar Kostan",
            "description": "Tukang Mie ayamnya ga di dalem kamar, butuh effort dikit jalan laa",
            "status": false,
            "due_date": "2020-03-30",
            "updatedAt": "2020-03-30T09:51:22.676Z",
            "createdAt": "2020-03-30T09:51:22.676Z"
        }
    ]
}
```
-----



### **`GET /todos/:id`**

`Find Todos with specific ID`

_Request Header_
```
Empty
```

_Request Body_
```
Empty
```

_Response (200)_
```
{
    "todos": [
        {
            "id": 1,
            "title": "Makan Mie Ayam",
            "description": "Beli Mie Ayam dulu di depan kost, baru bisa makan",
            "status": false,
            "due_date": "2020-03-30",
            "createdAt": "2020-03-30T09:51:22.676Z",
            "updatedAt": "2020-03-30T09:51:22.676Z"
        }
    ]
}
```
-----



### **`PUT /todos/:id`**

`Update Todos with specific ID`

_Request Header_
```
Empty
```

_Request Body_
```
{
    "id": 2,
    "title": "Ga jadi makan Mie ayam",
    "description": "Emangnya tutup, ga jadi beli deh, balik ke kost aja dee takut CORONA",
    "status": false,
    "due_date": "2020-03-30"
}
```

_Response (200)_
```
{
    "todos": [
        {
            "id": 2,
            "title": "Ga jadi makan Mie ayam",
            "description": "Emangnya tutup, ga jadi beli deh, balik ke kost aja dee takut CORONA",
            "status": false,
            "due_date": "2020-03-31",
            "createdAt": "2020-03-30T07:24:55.016Z",
            "updatedAt": "2020-03-30T09:54:41.331Z"
        }
    ]
}
```

_Response (400) | Bad Request_
```
{
    "messege": "Invalid Input, Please try again"
}
```

_Response (404) | Not Found_
```
{
    "messege": "Todos with ID 1000, not found"
}
```
-----



### **`DELETE /todos/:id`**

`Delete Todos with specific ID`

_Request Header_
```
Empty
```

_Request Body_
```
Empty
```

_Response (200)_
```
{
    "todos": [
        {
            "id": 1,
            "title": "Makan Mie Ayam",
            "description": "Beli Mie Ayam dulu di depan kost, baru bisa makan",
            "status": false,
            "due_date": "2020-03-30",
            "createdAt": "2020-03-30T09:51:22.676Z",
            "updatedAt": "2020-03-30T09:51:22.676Z"
        }
    ]
}
```

_Response (404) | Not Found_
```
{
    "messege": "Todos with ID 1000, not found"
}
```
-----



### **`SERVER FAILED to RESPONSE`**

`If Server failed to response`

_Response (500) | Internal Server Error_
```
{
    "messege": "Server failed to response"
}
```