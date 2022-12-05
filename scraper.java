public class scraper{

  public static void main(String[]args){
    ArrayList<WebElement> breakfast_foods = breakfast();
    for(WebElement curr: breakfast_foods ){
      System.out.println(curr.getText());
    }
  }

  ArrayList<WebElement> breakfast(){
    //This line of code adjusts the chrome driver so that it is always
    //accesible to the program regardless of where it is stored on the computer
    WebDriverManager.chromedriver().setup();

    //create a new chrome driver object and fetch the url for the bon appetit
    //website using this driver the driver is basically a chrome driver
    //is just an automated web browser so all this code is fundamentally doing
    //is searching up a url and fetching the website associated with the url
    String url ="https://emoryatlanta.cafebonappetit.com/cafe/dobbs-common-table/";
    ChromeDriver driver = new ChromeDriver();
    driver.get(url);

    //Since we only want breakfast foods we want to fetch the breakfast class
    //after I inspected this webpage I learned all the breakfast foods are
    //stored under the web element with the id breakfast so I fetch this
    //web element into a web element object named breakfast_class
    WebElement dining_class = driver.findElement(By.xpath("//section[ @id = 'breakfast']"));

    //The xpath, button[ contains(@class,'h4 site-panel__daypart-item-title' )]/span/../text(),
    //fetches all food items from the website since im only calling it on the breakfast_class
    //only the breakfast items should be returned
    ArrayList<WebElement> breakfast_items = driver.findElements(By.xpath("//button[ contains(@class ,   'h4 site-panel__daypart-item-title' )]/span/../text()"));

    //close driver
    driver.quit();
    //return breakfast items
    return breakfast_items;
}


}
