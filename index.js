const express = require('express');
var obj = require('./deeds.json');
var Dpdf = require("pdf-creator-node");
var fs = require('fs');


let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let PrintingDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;


var html = `
<html>
    <head>
        <title>Khotiyan sample</title>
        <style>
            table {
                width: 100%;
                table-layout: fixed;
            }
            table.page-body, table.page-body th, table.page-body td{
                width: auto;
                border: 1px solid black;
                margin: 3%;
            }
            tr#khotiyan-subheader td {
                text-align: center;
            }
            div.page-body-container {
                width: 100%;
            }
            tr.entries {
            	height: 400px;
            }
            tr.entries td {
            	text-align: top;
            }
            #footer {
            	padding-left: 20%;
            }
            div.box {
              width: auto;
              height: 45px;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              background-color:  black;	
              margin: 3%;	
              border-radius: 10px;
            }
            div.box h1 {
              color:  white;
            }
        </style>
    </head>
    <body>
            
    <div style="width: 100%">
      <div class="box">
        <h1>DU NIMBUS - খতিয়ান </h1>
      </div>
    </div>
        <table class="header">    <!-- Header table -->
            <tr>
                <td> </td>
                <td style="text-align: center;">
                    <h1>খতিয়ান নং- ${obj.খতিয়ান.নং}</h1>
                </td>
                <td style="text-align: right;">পৃষ্ঠা নংঃ ১</td>
            </tr>
        </table>
        <table>                 <!-- Mouza information table -->
            <tr>
                <td>বিভাগঃ ${obj.খতিয়ান.বিভাগ}</td>
                <td>জেলাঃ ${obj.খতিয়ান.জেলা}</td>
                <td>থানাঃ ${obj.খতিয়ান.উপজেলা}</td>
                <td>মৌজাঃ ${obj.খতিয়ান.মৌজা}</td>
                <td>জে,এল,নংঃ ${obj.খতিয়ান.জে_এল_নং}</td>
                <td>রেঃ সাঃ নংঃ ${obj.খতিয়ান.রে_সা_নং}</td>
            </tr>
        </table>
        <div class="page-body-container">
            <table class="page-body">
                <tr>
                    <th> মালিক, অকৃষি প্রজা বা ইজারাদারের তথ্য </th>
                    <th> অংশ </th>
                    <th> রাজস্ব </th>
                    <th> দাগ নং </th>
                    <th colspan="2"> জমির শ্রেণী </th> 
                    <th colspan="2"> দাগের মোট পরিমাণ </th>
                    <th> দাগের মধ্যে অত্র খতিয়ানের অংশ </th>
                    <th colspan="2"> অংশানুযায়ী জমির পরিমাণ </th>
                    <th> দখল বিষয়ক বা অন্যান্য বিশেষ মন্তব্য</th>
                </tr>
                <tr id="khotiyan-subheader">
                    <td>১</td>
                    <td>২</td>
                    <td>৩</td>
                    <td>৪</td>
                    <td>কৃষি ৫(ক)</td>
                    <td>অকৃষি ৫(খ)</td>
                    <td>একর ৬(ক)</td>
                    <td>অযুতাংশ ৬(খ)</td>
                    <td>৭</td>
                    <td>একর ৮(ক)</td>
                    <td>অযুতাংশ ৮(খ)</td>
                    <td>৯</td>
                </tr>
                <tr class="entries">
                    <td>
                    	<pre style="white-space:pre-line">
                        	    মালিক
                        	    দং ${obj.খতিয়ান.মালিক_অকৃষি_প্রজা_বা_ইজারাদারের_তথ্য[0].মালিক.দং}
                       	    পিতা  ${obj.খতিয়ান.মালিক_অকৃষি_প্রজা_বা_ইজারাদারের_তথ্য[0].মালিক.পিং} 
			    সাং ${obj.খতিয়ান.মালিক_অকৃষি_প্রজা_বা_ইজারাদারের_তথ্য[0].মালিক.সাং} 
                        </pre>
                    </td>
                    <td>${obj.খতিয়ান.মালিক_অকৃষি_প্রজা_বা_ইজারাদারের_তথ্য[0].অংশ} </td>
		    <td></td>
		    <td>${obj.খতিয়ান.দাগ[0].দাগ_নং}</td>
		    <td>${obj.খতিয়ান.দাগ[0].জমির_শ্রেণী}</td>
		    <td></td>
		    <td></td>
		    <td></td>
		    <td>${obj.খতিয়ান.মালিক_অকৃষি_প্রজা_বা_ইজারাদারের_তথ্য[0].অংশ}</td>
		    <td></td>
		    <td>${obj.খতিয়ান.দাগ[0].অংশানুযায়ী_জমির_পরিমাণ}</td>
		    <td></td>
                </tr>
		<tr>
		    <td>____ ধারামতে নোট বা পরিবর্তন মায় মোকদ্দমা নোং ____ এবং সন </td>
		    <td>${obj.খতিয়ান.মালিক_অকৃষি_প্রজা_বা_ইজারাদারের_তথ্য[0].অংশ}</td>
		    <td colspan="7">	<!-- TODO -->
		    
		    </td>
		    <td>0</td>
		    <td>${obj.খতিয়ান.দাগ[0].অংশানুযায়ী_জমির_পরিমাণ}</td>
		    <td></td>
		</tr>
            </table>
        </div>
        <span id="footer">
         	     তারিখ: ${PrintingDate}
        </span>
    </body>
</html>`;
//var html = fs.readFileSync('assets/khotiyan.html', 'utf8');

var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "0mm"
    },
    "footer": {
        "height": "10mm",
        "contents": {
        first: '1',
        2: '2', // Any page number is working. 1-based index
        default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        last: 'Last Page'
        }
    }
};


var document = {
    html: html,
    path: "./output/khatiyan.pdf"
};

Dpdf.create(document, options)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
});

var deedHTML = `<!-- TODO Polish the page -->
<html>
  <head>
    <meta charset="utf-8">
    <title>Transfer Deed</title>
    <style>
      table {
          margin-left: 25%;
          width: 75%;
          table-layout: fixed;
      }
      img.header-image {
          width: auto;
          margin-left: 20%;
          margin-right: 20%;
      }
      table.land-info, table.land-info tr, table.land-info.th, table.land-info td {
        border-collapse: collapse;
        border: 1px solid black;
      }
      table.no-bottom-border, table.no-bottom-border tr, 
          table.no-bottom-border th, table.no-bottom-border td {
        border-bottom: none;
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-top: 1px solid black;
      }
      div {
        width: 100%;
      }
      table.person-description th {
        text-align: left;
      }
      h4 {
        text-align: center;
      }
      div.box {
        width: auto;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color:  black;	
        margin: 3%;	
        border-radius: 10px;
      }
      div.box h1 {
        color:  white;
      }
    </style>
  </head>
  <body>
    <div>       <!-- page 1-->
    <div style="width: 100%">
    <div class="box">
      <h1>DU NIMBUS - দলিল </h1>
    </div>
</div>
      <table class="deed-info">
        <tr>
          <td>ক্রমিক নংঃ <u>${obj.ক্রমিক_নং}</u></td>
          <td>বহি নংঃ <u>${obj.বহি_নং}</u></td>
          <td>দলিল নংঃ <u>${obj.দলিল_নং}</u></td>
        </tr>
      </table>
      <ol>
        <li>রেজিস্ট্রারি অফিসের নামঃ- ${obj.রেজিস্টারি_অফিস}</li>
        <li>
          দলিলের সার-সংক্ষেপঃ <br/>
          <table class="land-info no-bottom-border">
            <tr>
              <th>দলিলের প্রকৃতি</th>
              <th>মৌজার নাম</th>
              <th>ইউনিয়ন</th>
              <th>থানা/উপজেলা</th>
              <th>জেলা</th>
            </tr>
            <tr>
              <td>${obj.দলিল.দলিলর_প্রকৃতি}</td>
              <td>${obj.খতিয়ান.মৌজা}</td>
              <td>${obj.খতিয়ান.উপজেলা}</td>
              <td>${obj.খতিয়ান.উপজেলা}</td>
              <td>${obj.খতিয়ান.জেলা}</td>
              
            </tr>
          </table>
          <table class="land-info">
            <tr>
              <th>হস্তান্তরিত সম্পত্তির পরিমান</th>
              <th>সম্পত্তির শ্রেণি</th>
              <th>সম্পত্তির মূল্য অংক ও কথায়</th>
            </tr>
            <tr>
              <td> ${obj.দলিল.হস্তান্তরিত_সম্পত্তির_পরিমান} শতাংশ</td>
              <td>${obj.দলিল.সম্পত্তির_শ্রেণি}</td>
              <td> ${obj.দলিল.সম্পত্তির_মূল্য.অংকে}/= (${obj.দলিল.সম্পত্তির_মূল্য.কথায়} টাকা)</td>
            </tr>
          </table>
        </li>
        <li>
          দলিল গ্রহিতার নাম ও ঠিকানাঃ-
          <table class="person-description">
            <tr>
              <th>নাম</th>
              <td>${obj.দলিল_গ্রহীতা.নাম}</td>
            </tr>
            <tr>
              <th>পিতার নাম</th>
              <td>${obj.দলিল_গ্রহীতা.পিতার_নাম}</td>
            </tr>
            <tr>
              <th>স্বামীর নাম</th>
              <td>${obj.দলিল_গ্রহীতা.স্বামীর_নাম}</td>	<!-- TODO add projojjo nohe -->
            </tr>
            <tr>
              <th>মাতার নাম</th>
              <td>${obj.দলিল_গ্রহীতা.মাতার_নাম}</td>
            </tr>
            <tr>
              <th>বয়স</th>
              <td>${obj.দলিল_গ্রহীতা.বয়স}</td>		<!-- TODO convert 48 to bangla and add botshor-->
            </tr>
            <tr>
              <th>ধর্ম</th>
              <td>${obj.দলিল_গ্রহীতা.ধর্ম}</td>
            </tr>
            <tr>
              <th>পেশা</th>
              <td>${obj.দলিল_গ্রহীতা.পেশা}</td>
            </tr>
            <tr>
              <th>জাতীয়তা</th>
              <td>${obj.দলিল_গ্রহীতা.জাতীয়তা}</td> 
            </tr>
            <tr>
              <th>স্থায়ী ঠিকানা</th>
              <td>${obj.দলিল_গ্রহীতা.স্থায়ী_ঠিকানা}</td>
            </tr>
            <tr>
              <th>বর্তমান ঠিকানা</th>
              <td>${obj.দলিল_গ্রহীতা.বর্তমান_ঠিকানা}</td>
            </tr>
          </table>
        </li>
        <li>
          দলিল দাতার নাম ও ঠিকানাঃ-
          <table class="person-description">
            <tr>
              <th>নাম</th>
              <td>${obj.দলিল_দাতা.নাম}</td>
            </tr>
            <tr>
              <th>পিতার নাম</th>
              <td>${obj.দলিল_দাতা.পিতার_নাম}</td>
            </tr>
            <tr>
              <th>স্বামীর নাম</th>
              <td>${obj.দলিল_দাতা.স্বামীর_নাম}</td>	<!-- TODO add projojjo nohe -->
            </tr>
            <tr>
              <th>মাতার নাম</th>
              <td>${obj.দলিল_দাতা.মাতার_নাম}</td>
            </tr>
            <tr>
              <th>বয়স</th>
              <td>${obj.দলিল_দাতা.বয়স}</td>		<!-- TODO convert 48 to bangla and add botshor -->
            </tr>
            <tr>
              <th>ধর্ম</th>
              <td>${obj.দলিল_দাতা.ধর্ম}</td>
            </tr>
            <tr>
              <th>পেশা</th>
              <td>${obj.দলিল_দাতা.পেশা}</td>
            </tr>
            <tr>
              <th>জাতীয়তা</th>
              <td>${obj.দলিল_দাতা.জাতীয়তা}</td> 
            </tr>
            <tr>
              <th>স্থায়ী ঠিকানা</th>
              <td>${obj.দলিল_দাতা.স্থায়ী_ঠিকানা}</td>
            </tr>
            <tr>
              <th>বর্তমান ঠিকানা</th>
              <td>${obj.দলিল_দাতা.বর্তমান_ঠিকানা}</td>
            </tr>
          </table>
        </li>
        <li>
          আম-মোক্তার/প্রতিনিধি/অভিভাবক মাধ্যমে দলিল সম্পাদিত হইয়া থাকিলে আম-মোক্তারের নাম ও ঠিকানাঃ-
          <span> ${obj.আম_মোক্তার} </span>
        </li>
        <li>
          আম-মোক্তার নাম্বার বিবরণঃ-
          <span>প্রযোজ্য নহে</span>
        </li>
        <li> <!-- Land description -->
          হস্তান্তরাধীন জমির ন্যুনপক্ষে ২৫ বছরের মালিকানা ধারাবাহিক বিবরণ ও যথাযথ ক্ষেত্রে <!-- TODO এখানে কি বসবে ছবি দেখে বুঝা যায় নাই -->
          দলিল সমূহের বিস্তারিত বিবরণ ও হস্তান্তরের প্রকৃত উদ্দেশ্যঃ- <br/>
          <p>
          ${obj.বিবরণ}
          </p>
        </li>
        <li>
          একাধিক ক্রেতা/গ্রহিতার ক্ষেত্রে ক্রয়কৃত/অর্জিত জমির হারাহারি মালিকানার বিবরণঃ- <span>সম্পূর্ণ</span>
        </li>
        <li>
          একাধিক বিক্রেতা/দাতার ক্ষেত্রে হস্তান্তরকৃত জমির হারাহারি মালিকানার বিবরণঃ- <span>সম্পূর্ণ</span>
        </li>
        <li>
          দলিল সম্পাদনের তারিখঃ- <span>বাংলা ১৪১৭ সন- ২৩ তেইশে চৈত্র ০৬/০৪/২০১১</span>
        </li>
        <li>
          দলিল সম্পাদনের তারিখঃ- <span> ইং ${PrintingDate}</span>
        </li>
    
        <li>    <!--------- তফসিল শুরু ------------>
          <br/>
          <h4>-ঃতফসিলঃ-</h4>
          <div>
            <p>
              জেলা-<span>${obj.খতিয়ান.জেলা}<span>,
              থানা-<span>${obj.খতিয়ান.উপজেলা}</span>, 
              <span>${obj.রেজিস্টারি_অফিস}</span> অধীন ঢাকা কালেক্টরির তৌজিভুক্ত
              সি. এস. <span>${obj.cs.মৌজা_নং}</span>নং, 
              এস. এ. <span>${obj.sa.মৌজা_নং}</span>নং, 
              আর. এস. <span>${obj.খতিয়ান.মৌজা_নং}</span>নং মৌজা-' ${obj.খতিয়ান.মৌজা} ' স্থিত। 
              সি. এস. <span>${obj.cs.নং}</span>নং, এস. এ. <span>${obj.sa.নং}</span>নং, 
              আর. এস. <span>${obj.খতিয়ান.নং}</span> নং খতিয়ানে বার্ষিক অস্থায়ী 
              মং ${obj.খতিয়ান.অস্থায়ী_মং} টাকা জমায় যে, ${obj.খতিয়ান.এক_রায়তী} শতাংশ এক রায়তী জোত নিয়ত আছে তন্মধ্যে অত্র দলিলে বিক্রীত ভূমির পরিমান 
              <span>${obj.দলিল.হস্তান্তরিত_সম্পত্তির_পরিমান} শতাংশ</span>, যাহার হারাহারী খাজনা ${obj.খতিয়ান.উপজেলা} উপজেলা সহকারী কমিশনার রাজস্ব ভূমি বিভাগে প্রতি সন আদায় হয়।
            </p>
          </div>
          <h4>মং-${obj.দলিল.হস্তান্তরিত_সম্পত্তির_পরিমান} ভূমি অত্র দলিলে বিক্রীত মাত্র।</h4>
        </li>
        <li>    <!-- chouhoddi -->
          সম্পত্তি সংলগ্ন জমির মালিকদের নাম ও বিবরণঃ
          <span>উত্তরে</span>-<span>${obj.চৌহদ্দি[0].বর্ণনা}</span>,
          <span>পূর্বে</span>-<span>${obj.চৌহদ্দি[1].বর্ণনা}</span>,
          <span>দক্ষিনে</span>-<span>${obj.চৌহদ্দি[2].বর্ণনা}</span>,
          <span>পশ্চিমে</span>-<span>${obj.চৌহদ্দি[3].বর্ণনা}</span>,
          অত্র চৌহদ্দির মধ্যে আমি অত্র দলিল দাতা আমার খরিদা ২ ষোল আনা অত্র দলিলে 
          বিক্রীত ভূমির পরিমান <span>${obj.দলিল.হস্তান্তরিত_সম্পত্তির_পরিমান} শতাংশ</span> মাত্র
        </li>
        <li>
          হস্তান্তরিত সম্পত্তির মূল্য এবং পরিশোধের বিবরণঃ- অংকে ও কথায়ঃ- <span>${obj.দলিল.সম্পত্তির_মূল্য.অংকে}/=</span>
          <span>(${obj.দলিল.সম্পত্তির_মূল্য.কথায়}) টাকা</span>
        </li>
        <!-- দলিল দাতা ও দলিল গ্রহীতার সাক্ষর এখানে থাকার কথা কিন্তু ব্লকচেইনে ছবি রাখবনা বলে স্কিপ করছি -->
        <!-- এখন সাক্ষীদের তথ্য যুক্ত করা হচ্ছে -->
        <li>
          স্বাক্ষী/স্বাক্ষীগনের নাম ও ঠিকানাঃ-     <!-- এখানে সাক্ষর দিচ্ছি না -->
          <ol>
            <li>
              <table>
                <tr>
                  <th>নামঃ</th>
                  <td>${obj.সাক্ষী[0].নাম}</td>
                  <th>তারিখঃ</th>
                  <td>${obj.সাক্ষী[0].তারিখ}</td>
                </tr>
                <tr>
                  <th>পিতার নামঃ</th>
                  <td>${obj.সাক্ষী[0].পিতার_নাম}</td>
                  <th>মাতার নামঃ</th>
                  <td>${obj.সাক্ষী[0].মাতার_নাম}</td>
                </tr>
                <tr>
                  <th>গ্রাম/রোড নংঃ</th>
                  <td>${obj.সাক্ষী[0].গ্রাম_রোড_নং}</td>
                  <th></th>
                  <td></td>
                </tr>
                <tr>
                  <th>ইউনিয়ন/ওয়ার্ডঃ</th>
                  <td>${obj.সাক্ষী[0].ইউনিয়ন_ওয়ার্ড}ম</td>
                  <th>পেশাঃ</th>
                  <td>${obj.সাক্ষী[0].পেশা}</td>
                </tr>
                <tr>
                  <th>থানাঃ</th>
                  <td>${obj.সাক্ষী[0].থানা}</td>
                  <th>বয়সঃ</th>
                  <td>${obj.সাক্ষী[0].বয়স}</td>
                </tr>
                <tr>
                  <th>জেলাঃ</th>
                  <td>${obj.সাক্ষী[0].জেলা}</td>
                  <th>জাতীয়তাঃ</th>
                  <td>${obj.সাক্ষী[0].জাতীয়তা}</td>
                </tr>
              </table>
            </li>
            <li>
            <table>
            <tr>
              <th>নামঃ</th>
              <td>${obj.সাক্ষী[1].নাম}</td>
              <th>তারিখঃ</th>
              <td>${obj.সাক্ষী[1].তারিখ}</td>
            </tr>
            <tr>
              <th>পিতার নামঃ</th>
              <td>${obj.সাক্ষী[1].পিতার_নাম}</td>
              <th>মাতার নামঃ</th>
              <td>${obj.সাক্ষী[1].মাতার_নাম}</td>
            </tr>
            <tr>
              <th>গ্রাম/রোড নংঃ</th>
              <td>${obj.সাক্ষী[1].গ্রাম_রোড_নং}</td>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>ইউনিয়ন/ওয়ার্ডঃ</th>
              <td>${obj.সাক্ষী[1].ইউনিয়ন_ওয়ার্ড}ম</td>
              <th>পেশাঃ</th>
              <td>${obj.সাক্ষী[1].পেশা}</td>
            </tr>
            <tr>
              <th>থানাঃ</th>
              <td>${obj.সাক্ষী[1].থানা}</td>
              <th>বয়সঃ</th>
              <td>${obj.সাক্ষী[1].বয়স}</td>
            </tr>
            <tr>
              <th>জেলাঃ</th>
              <td>${obj.সাক্ষী[1].জেলা}</td>
              <th>জাতীয়তাঃ</th>
              <td>${obj.সাক্ষী[1].জাতীয়তা}</td>
            </tr>
          </table>
            </li>
          </ol>
        </li>
        <li>
          ভুল ভ্রান্তি সম্পর্কে কৈফিয়ত (যদি থাকে )ঃ- <span></span>
        </li>
        <li>
          সনাত্তকারির নাম ও ঠিকানাঃ
          <table>
          <tr>
            <th>নামঃ</th>
            <td>${obj.শনাক্তকারী[0].নাম}</td>
            <th>তারিখঃ</th>
            <td>${obj.শনাক্তকারী[0].তারিখ}</td>
          </tr>
          <tr>
            <th>পিতার নামঃ</th>
            <td>${obj.শনাক্তকারী[0].পিতার_নাম}</td>
            <th>মাতার নামঃ</th>
            <td>${obj.শনাক্তকারী[0].মাতার_নাম}</td>
          </tr>
          <tr>
            <th>গ্রাম/রোড নংঃ</th>
            <td>${obj.শনাক্তকারী[0].গ্রাম_রোড_নং}</td>
            <th></th>
            <td></td>
          </tr>
          <tr>
            <th>ইউনিয়ন/ওয়ার্ডঃ</th>
            <td>${obj.শনাক্তকারী[0].ইউনিয়ন_ওয়ার্ড}ম</td>
            <th>পেশাঃ</th>
            <td>${obj.শনাক্তকারী[0].পেশা}</td>
          </tr>
          <tr>
            <th>থানাঃ</th>
            <td>${obj.শনাক্তকারী[0].থানা}</td>
            <th>বয়সঃ</th>
            <td>${obj.শনাক্তকারী[0].বয়স}</td>
          </tr>
          <tr>
            <th>জেলাঃ</th>
            <td>${obj.শনাক্তকারী[0].জেলা}</td>
            <th>জাতীয়তাঃ</th>
            <td>${obj.শনাক্তকারী[0].জাতীয়তা}</td>
          </tr>
        </table>
        </li>
        <li>
          হস্তান্তরিত সম্পত্তির সঠিক পরিচয় এবং বাজার মূল্য সম্পর্কে সম্যাক অবহিত হইয়া আমি নিম্ন
          স্বাক্ষরকারী অত্র দলিল মুসাবিদা করিয়াছি/লিখিয়া দিয়াছি এবং পক্ষগণকে পাঠ করিয়া শুনাইয়াছি। <br/>
          দলিল লেখকের নাম ও স্বাক্ষরঃ
          <ul style="list-style-type: none;">
          <li>নাম- <span> ${obj.দলিল_লেখক.নাম}</span></li>
            <li>পূর্ণ ঠিকানাঃ- <span>${obj.দলিল_লেখক.পূর্ণ_ঠিকানা}</span></li>
            <li>সনদ নম্বরঃ- <span> ${obj.দলিল_লেখক.সনদ_নম্বর}</span></li>
            <li>অফিসের নামঃ- <span>${obj.দলিল_লেখক.অফিসের_নাম}</span></li>
          </ul>
        </li>
        <li>    <!-- dolil datar holof nama -->
          <h4> -ঃ <u>দলিল দাতার হলফ নামা</u> ঃ- </h4>
          <span>${obj.দলিল_দাতা.নাম}</span>
          <p>
            এই মর্মে হলফনামা প্রদান করিতেছি যে, আমি হস্তান্তরাধীন জমির নিরংকুশ মালিক, অন্য কোন পক্ষের সাথে বায়না চুক্তি
            স্বাক্ষর করি নাই বা অন্য কোন পক্ষের নিকট বন্ধক রাখি নাই। এই সম্পত্তি সরকারী খাস বা পরিত্যক্ত সম্পত্তি নয় বা
            অন্য কোন ভাবে সরকারের উপর বর্তায় নাই। আরও হলফ করিতেছি যে, উপরোক্ত কোন তথ্য ভুলভাবে লিপিবদ্ধ হইয়া
            থাকিলে তজ্জন্য আমি দায়ী হইব এবং আমার বিরুদ্ধে দেওয়ানি ও ফৌজদারি মামলা করা যাইবে। হস্তান্তরিত জমি সম্পর্কে 
            কোন ভুল অসত্য, বিভ্রান্তিকর তথ্য প্রদান করিয়া থাকিলে প্রয়োজনে নিজ খরচায় ভুল শুদ্ধ করিয়া ক্ষতিপূরণসহ নতুন
            দলিল প্রস্তুত ও রেজিস্ট্রারী করিয়া দিতে বাধ্য থাকিব। উল্লেখ্য যে, দলিলে হস্তান্তরিত সম্পত্তির মূল্য কম দেখানো হয় নাই।
          </p>
          তারিখঃ <span>${PrintingDate}</span> ইং <br/>
          সনাত্তকারির নাম ও ঠিকানাঃ
          <table>
            <tr>
              <th>নামঃ</th>
              <td>${obj.শনাক্তকারী[0].নাম}</td>
            </tr>
            <tr>
              <th>পিতার নামঃ</th>
              <td>${obj.শনাক্তকারী[0].পিতার_নাম}</td>
            </tr>
            <tr>
              <th>গ্রাম/রোড নংঃ</th>
              <td>${obj.শনাক্তকারী[0].গ্রাম_রোড_নং}</td>
            </tr>
            <tr>
              <th>ইউনিয়ন/ওয়ার্ডঃ</th>
              <td>${obj.শনাক্তকারী[0].ইউনিয়ন_ওয়ার্ড}</td>
            </tr>
            <tr>
              <th>থানাঃ</th>
              <td>${obj.শনাক্তকারী[0].থানা}</td>
            </tr>
            <tr>
              <th>জেলাঃ</th>
              <td>${obj.শনাক্তকারী[0].জেলা}</td>
            </tr>
          </table>
        </li>
        <li>
          রেজিস্ট্রী কর্মকর্তার নামঃ-<span> ${obj.রেজিস্ট্রী_কর্মকর্তা.নাম}</span> <br/>
          পদবীঃ-<span>${obj.রেজিস্ট্রী_কর্মকর্তা.পদবী}</span>
        </li>
      </ol>
    </div>
  </body>
</html>`;

var documentDeed = {
    html: deedHTML,
    path: "./output/deed.pdf"
};

Dpdf.create(documentDeed, options)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
});

console.log('Done');