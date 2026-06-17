*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    background:#24272A;
    color:#24272A;
    min-height:100vh;
}

.container{
    max-width:950px;
    margin:auto;
    padding:25px;
}

/* HEADER */

.app-header{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:14px;
    margin-bottom:30px;
}

.app-logo{
    width:46px;
    height:46px;
    border-radius:12px;
    box-shadow:0 4px 12px rgba(0,0,0,.25);
}

h1{
    color:#ededed;
    font-size:2rem;
    font-weight:700;
}

h2{
    margin-bottom:18px;
    color:#24272A;
}

/* TABS */

.tabs{
    display:flex;
    gap:12px;
    margin-bottom:20px;
}

.tabs button{
    flex:1;
    padding:15px;
    border:none;
    border-radius:14px;
    cursor:pointer;
    font-size:1rem;
    font-weight:700;
    transition:.25s;
}

.tabs button:first-child{
    background:#a57f50;
    color:white;
}

.tabs button:first-child:hover{
    background:#8d6b42;
}

.tabs button:last-child{
    background:#008080;
    color:white;
}

.tabs button:last-child:hover{
    background:#006868;
}

/* PANELS */

.tab{
    display:none;
    background:#ededed;
    padding:28px;
    border-radius:20px;
    box-shadow:0 8px 30px rgba(0,0,0,.20);
}

.tab.active{
    display:block;
}

/* INPUTS */

input{
    width:100%;
    padding:14px;
    margin-bottom:14px;
    border:1px solid #d5d5d5;
    border-radius:12px;
    font-size:1rem;
    background:white;
    transition:.2s;
}

input:focus{
    outline:none;
    border-color:#5c857d;
    box-shadow:0 0 0 4px rgba(159,207,202,.35);
}

/* BUTTONS */

button{
    border:none;
    border-radius:12px;
    cursor:pointer;
    font-size:1rem;
    font-weight:600;
}

/* ACTIVAR */

.activate-btn{
    width:100%;
    padding:15px;
    background:#a57f50;
    color:white;
}

.activate-btn:hover{
    background:#8d6b42;
}

/* REDIMIR */

.redeem-btn{
    width:100%;
    padding:15px;
    background:#008080;
    color:white;
}

.redeem-btn:hover{
    background:#006868;
}

/* QR */

#reader,
#readerRedeem{
    width:100%;
    margin-bottom:20px;
    border-radius:14px;
    overflow:hidden;
}

/* CARD INFO */

.info-card{
    background:white;
    border-left:6px solid #008080;
    border-radius:14px;
    padding:18px;
    margin-top:15px;
    margin-bottom:15px;
    box-shadow:0 3px 10px rgba(0,0,0,.08);
}

.info-card p{
    margin-bottom:8px;
}

.info-card p:last-child{
    margin-bottom:0;
}

/* BALANCE */

.balance-display{
    text-align:center;
    font-size:4rem;
    font-weight:800;
    color:#008080;
    margin:20px 0;
}

/* STATUS */

.status-active{
    color:#008080;
    font-weight:700;
}

.status-used{
    color:#c0392b;
    font-weight:700;
}

/* LABELS */

label{
    display:block;
    margin-bottom:6px;
    margin-top:12px;
    font-weight:700;
    color:#5c857d;
}

/* SUCCESS */

.success{
    color:#1b7a37;
    font-weight:700;
}

/* ERROR */

.error{
    color:#c0392b;
    font-weight:700;
}

/* MOBILE */

@media(max-width:768px){

    .container{
        padding:15px;
    }

    .app-header{
        flex-direction:row;
    }

    .app-logo{
        width:40px;
        height:40px;
    }

    h1{
        font-size:1.4rem;
        text-align:center;
    }

    .tabs{
        flex-direction:column;
    }

    .balance-display{
        font-size:3rem;
    }

    .tab{
        padding:18px;
    }
}
