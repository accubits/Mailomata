
url="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1";
subject='The worlds best ico platform';
body='Check out our ico platform While ICOs are an effective way to raise capital, it is also vulnerable to fraud. The rising number of scams makes it difficult for genuine and revolutionary ICOs to raise the money they rightly deserve. This was a key consideration for us when we designed our token sales platform and we have come up with something that can mitigate the risks that investors face. Our ICO platform can facilitate milestone based ICOs. Essentially, the funds raised would be distributed over various milestones only after the community approves it. We believe this model would renew faith in ICOs and you could raise money faster. This functionality can be enabled by the administrator of the ICO, if it is deemed appropriate.';
start();

function start() {

    setInterval(function () {

        $.post("http://127.0.0.1:5000/getEmail",
                            {

                            },
                            function (data, status) {



                                if (data.success) {

                                    console.log(data.result);
                                    finalUrl=url+'&to='+data.result+'&su='+subject+'&body='+body+'';


                                    popupWindow = window.open(finalUrl,'popup' , "width=600,height=600");

                                    waitForXpathSelector('//*[@id=":p2"]',popupWindow.document,function() {

                                        console.log("exectued");
                                        popupWindow.document.getElementById(":p2").click();
                                    $.post("http://127.0.0.1:5000/sendEmail",
                            {
                                'email':data.result
                            },
                            function (data, status) {



                                if (data.success) {

                                    console.log(data.result);
                                }}
                                );
                                })

                                    // setTimeout(function () {
                                   //  popupWindow.document.getElementById(":p2").click();
                                   //  },1000);
                                    //
                                    // console.log("true");
                                }
                                else {
                                    console.log("false");
                                }

                            });




    },10000);
}


var waitForXpathSelector = function(xpathSelector,document, callback) {
  if (document.evaluate(xpathSelector, document, null, XPathResult.ANY_TYPE, null).iterateNext()!==null) {
    callback();
  } else {
    setTimeout(function() {
        console.log("timeout");

      waitForXpathSelector(xpathSelector,document, callback);
    }, 1000);
  }
};

