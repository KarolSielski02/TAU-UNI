# LAB 2 - s25944

Instalacja:
Instalujemy selenium dla JS: https://www.selenium.dev/documentation/webdriver/getting_started/install_library/

Testy wykonywane są na przeglądarkach chrome, firefox i safari

Na maszynie należy posiadać npm'a po czym wykonać komendę
```npm install```

# Scenariusz testowy: Automatyzacja testów interfejsu Otodom na różnych przeglądarkach

## 1. Nazwa testu
Test interfejsu Otodom na różnych przeglądarkach

## 2. Środowisko testowe
- **Przeglądarki**: Chrome, Firefox, Safari
- **URL**: https://otodom.pl/

## 3. Założenia wstępne
- Przeglądarki posiadają niezbędne sterowniki (chromedriver, geckodriver, safaridriver).
- Dostęp do internetu.

## 4. Kroki testowe
1. Uruchom przeglądarkę z listy `browsers` (Chrome, Firefox, Safari).
2. Otwórz stronę główną Otodom (https://otodom.pl/).
3. Zweryfikuj, czy przycisk **Accept Cookies** jest widoczny.
4. Kliknij przycisk **Accept Cookies**.
5. Zweryfikuj, czy **Burger Menu** jest widoczne, a następnie kliknij je.
6. Zweryfikuj, czy przycisk **Sell** (zakup nieruchomości) jest widoczny, a następnie kliknij go.
7. Zweryfikuj, czy przycisk **Sell Estate** (nieruchomości na sprzedaż) jest widoczny, a następnie kliknij go.
8. Zweryfikuj, czy przycisk **Sell Estate Apartments** (mieszkania na sprzedaż) jest widoczny, a następnie kliknij go.
9. Zweryfikuj, czy sekcja **Mieszkania na sprzedaż** jest widoczna oraz czy jej zawartość odpowiada oczekiwanemu tekstowi.
10. Zweryfikuj, czy zakres **Cała Polska** jest widoczny oraz czy zawiera odpowiednią frazę.

## 5. Oczekiwany rezultat
- Wszystkie elementy (przyciski, menu, sekcje) są dostępne i wyświetlane zgodnie z oczekiwaniami.
- Zawartość strony zawiera odpowiednie teksty, takie jak "Mieszkania na sprzedaż" i "Cała Polska".

## 6. Końcowy krok
- Zamknij przeglądarkę.


# Scenariusz testowy: Automatyzacja testów interfejsu Stack Overflow na różnych przeglądarkach

# Scenariusz nr 2. - https://stackoverflow.com/
Test interfejsu Stack Overflow na różnych przeglądarkach

## 2. Środowisko testowe
- **Przeglądarki**: Chrome, Firefox, Safari
- **URL**: https://stackoverflow.com/

## 3. Założenia wstępne
- Przeglądarki posiadają niezbędne sterowniki (chromedriver, geckodriver, safaridriver).
- Dostęp do internetu.

## 4. Kroki testowe
1. Uruchom przeglądarkę z listy `browsers` (Chrome, Firefox, Safari).
2. Otwórz stronę główną Stack Overflow (https://stackoverflow.com/).
3. Zweryfikuj, czy przycisk **Accept Cookies** jest widoczny.
4. Kliknij przycisk **Accept Cookies**.
5. Jeśli przeglądarka to **Safari** lub **Firefox**:
   - Znajdź iframe z tytułem „Okno Zaloguj się przez Google”.
   - Przełącz się na to iframe.
   - Zweryfikuj, czy przycisk **Continue Google** jest widoczny i kliknij go, a następnie wróć do głównej zawartości strony.
6. Znajdź przycisk **Sign up** i zweryfikuj jego widoczność, a następnie kliknij go.
7. Zweryfikuj, czy przycisk **Log in** jest widoczny.
8. Kliknij przycisk **Log in** (lub załaduj bezpośredni link w Safari).
9. Zweryfikuj widoczność formularza logowania (id: `login-form`).
10. Zweryfikuj widoczność oraz typ pola **email**.
11. Zweryfikuj widoczność oraz typ pola **password**.
12. Zweryfikuj widoczność przycisku **Submit**.
13. Wprowadź dane testowe w pola **email** i **password**:
    - **Email**: `test@test.com`
    - **Hasło**: `qwerty`
14. Kliknij przycisk **Submit**.
15. Zweryfikuj, czy wyświetlony jest komunikat o nieistniejącym koncie.

## 5. Oczekiwany rezultat
- Wszystkie elementy (przyciski, pola tekstowe) są dostępne i wyświetlane zgodnie z oczekiwaniami.
- Użytkownik otrzymuje ostrzeżenie o błędnych danych logowania dla nieistniejącego konta.

## 6. Końcowy krok
- Zamknij przeglądarkę.


# Scenariusz testowy: Automatyzacja testów Wikipedii z funkcjonalnością zmiany języka

# Scenariusz nr 3. - https://wikipedia.com/

## 1. Nazwa testu
Test funkcjonalności wyszukiwania i zmiany języka na Wikipedii.

## 2. Środowisko testowe
- **Przeglądarki**: Chrome, Firefox, Safari
- **URL**: https://pl.wikipedia.org/

## 3. Założenia wstępne
- Przeglądarki posiadają niezbędne sterowniki (chromedriver, geckodriver, safaridriver).
- Dostęp do internetu.

## 4. Kroki testowe
1. Uruchom przeglądarkę z listy `browsers` (Chrome, Firefox, Safari).
2. Otwórz stronę główną Wikipedii (https://pl.wikipedia.org/).
3. Zweryfikuj, czy przycisk **Search** (z skrótem klawiszowym "f") jest widoczny, a następnie kliknij go.
4. Zweryfikuj widoczność pola wyszukiwania i upewnij się, że ma typ **search**.
5. Wyczyść pole wyszukiwania i wpisz zapytanie: **Polska**.
6. W zależności od przeglądarki:
   - **Chrome/Firefox**: Naciśnij **Enter**.
   - **Safari**: Kliknij widoczny link sugerujący „Polska”.
7. Zweryfikuj, czy tytuł strony wyników wyszukiwania to **Polska**.
8. Znajdź i zweryfikuj widoczność linku do artykułu **Warszawa**, a następnie kliknij go.
9. Zweryfikuj, czy tytuł nowo otwartej strony to **Warszawa**.
10. Zweryfikuj, czy checkbox do zmiany języka (przycisk **p-lang-btn**) jest widoczny, a następnie kliknij go.
11. W zależności od przeglądarki:
    - **Chrome/Firefox**: Zweryfikuj, czy link do wersji angielskiej artykułu (**English Lang**) jest widoczny i kliknij go.
    - **Safari**: Otwórz stronę angielską z bezpośredniego linku: `https://en.wikipedia.org/wiki/Warsaw`.
12. Zweryfikuj, czy tytuł strony w wersji angielskiej to **Warsaw**.

## 5. Oczekiwany rezultat
- Wszystkie elementy (przyciski, pole wyszukiwania, tytuły stron) są dostępne i wyświetlane zgodnie z oczekiwaniami.
- Po wyszukaniu "Polska", użytkownik zostaje przekierowany na stronę artykułu o Polsce, a następnie na artykuł o Warszawie.
- Użytkownik powinien mieć możliwość zmiany języka strony na angielski, a artykuł o Warszawie w wersji angielskiej powinien być dostępny.

## 6. Końcowy krok
- Zamknij przeglądarkę.


# Scenariusz testowy: Automatyzacja testów dla strony PJATK

# Scenariusz nr 4. - https://pja.edu.pl/

## 1. Nazwa testu
Test funkcjonalności strony PJATK z uwzględnieniem różnych przeglądarek.

## 2. Środowisko testowe
- **Przeglądarki**: Chrome, Firefox, Safari
- **URL**: https://pja.edu.pl/

## 3. Założenia wstępne
- Przeglądarki posiadają niezbędne sterowniki (chromedriver, geckodriver, safaridriver).
- Dostęp do internetu.

## 4. Kroki testowe

1. Uruchom przeglądarkę z listy `browsers` (Chrome, Firefox, Safari).
2. Otwórz stronę główną PJATK (https://pja.edu.pl/).
3. Zweryfikuj, czy przycisk **Accept Cookies** jest widoczny, a następnie kliknij go.
4. Zweryfikuj widoczność linku **Studia** w menu i kliknij go (w Safari załaduj stronę bezpośrednio: https://pja.edu.pl/studia/).
5. Zweryfikuj, czy nazwa wydziału (deptName) jest widoczna.
6. Znajdź i zweryfikuj widoczność przycisku do Wydziału Informatyki w Gdańsku i kliknij go (w Safari załaduj stronę bezpośrednio: `https://gdansk.pja.edu.pl/informatyka/?_gl=1*1dgq8hs*_gcl_au*MTUzMzU3OTExMS4xNzMxNTMwODYz`).
7. Zweryfikuj, czy przycisk **Accept Cookies** na stronie Gdańsk jest widoczny i kliknij go.
8. Zweryfikuj widoczność przycisku **Menu Button** na stronie Gdańsk i kliknij go.
9. Kliknij na link **Gakko** w menu Gdańsk.
10. Zweryfikuj widoczność pola **email** w formularzu logowania oraz upewnij się, że jego typ to "email".
11. Wprowadź testowy adres email: `someone@example.com` do pola **email**.
12. Zweryfikuj widoczność pola **password** i upewnij się, że jego typ to "password".
13. Wprowadź testowe hasło: `qwerty` do pola **password**.
14. Kliknij przycisk **Submit**.
15. Zweryfikuj, czy wyświetla się komunikat o błędzie (ID: **errorText**).

## 5. Oczekiwany rezultat
- Wszystkie elementy (przyciski, pola tekstowe) są dostępne i wyświetlane zgodnie z oczekiwaniami.
- Użytkownik otrzymuje komunikat o błędnym logowaniu z powodu niepoprawnych danych.
- Po kliknięciu w odpowiednie linki, użytkownik jest poprawnie przekierowywany do odpowiednich sekcji strony.

## 6. Końcowy krok
- Zamknij przeglądarkę.