Feature: Buying tickets

    Scenario: Should buy avaliable ticket 
        Given user goes to page "http://qamid.tmweb.ru/client/index.php"
        When user select date tomorrow "2" and time seance "1140"
        When user select place row "3" and seat "3"
        When user click on button Забронирвоать
        Then user get ticket info "Вы выбрали билеты:" tickets with place "3/3"
        When user click on the button Получить код бронирования
        Then user get massage "Электронный билет"

    Scenario: Should buy three avaliable tickets 
        Given user goes to page "http://qamid.tmweb.ru/client/index.php"
        When user select date tomorrow "2" and time seance "1140"
        When user select place row "7" and seat "3"
        When user select place row "7" and seat "4"
        When user select place row "7" and seat "5"
        When user click on button Забронирвоать
        Then user get ticket info "Вы выбрали билеты:" tickets with place "7/3, 7/4, 7/5"
        When user click on the button Получить код бронирования
        Then user get massage "Электронный билет"

    Scenario: Should not buy unavaliable ticket
        Given user goes to page "http://qamid.tmweb.ru/client/index.php"
        When user select date tomorrow "2" and time seance "1140"
        When user select place row "2" and seat "2"
        When user click on button Забронирвоать
        Then user get ticket info "Вы выбрали билеты:" tickets with place "2/2"
        When user click on the button Получить код бронирования
        Then user get massage "Электронный билет"
        Given user goes to page "http://qamid.tmweb.ru/client/index.php"
        When user select date tomorrow "2" and time seance "1140"
        When user select place row "6" and seat "8"
        Then button Забронирвоать not active
        
        
    


