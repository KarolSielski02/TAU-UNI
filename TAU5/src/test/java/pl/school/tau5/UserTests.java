package pl.school.tau5;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        userRepository.save(new User("Karol Sielski", "karol@sielski.pl"));
        userRepository.save(new User("Krzysztof Krawczyk", "krzysztof@krawczyk.pl"));
    }

    @Test
    void testGetUsers() throws Exception {
        System.out.println(objectMapper.writeValueAsString(userRepository.findAll()));
        mockMvc.perform(get("/users"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }

    @Test
    void testGetUserById() throws Exception {
        User user = userRepository.save(new User("Jan Kowalski", "jan@kowalski.pl"));
        System.out.println(objectMapper.writeValueAsString(userRepository.findById(user.getId())));
        mockMvc.perform(get("/users/{id}", user.getId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Jan Kowalski"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("jan@kowalski.pl"));
    }

    @Test
    void testGetUserByIdNotFound() throws Exception {
        mockMvc.perform(get("/users/{id}", 999))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    void testCreateUser() throws Exception {
        User user = new User();
        user.setName("Anna Nowak");
        user.setEmail("anna@nowak.pl");

        mockMvc.perform(post("/users")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Anna Nowak"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("anna@nowak.pl"));
        System.out.println(objectMapper.writeValueAsString(userRepository.findAll()));
    }

    @Test
    void testCreateUserWithMissingFields() throws Exception {
        User user = new User();
        user.setName("Incomplete User");

        mockMvc.perform(post("/users")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void testUpdateUser() throws Exception {
        User user = userRepository.save(new User("Jan Kowalski", "jan@kowalski.pl"));
        user.setName("Janek Kowalski");

        mockMvc.perform(put("/users/{id}", user.getId())
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Janek Kowalski"));
        System.out.println(objectMapper.writeValueAsString(userRepository.findAll()));
    }

    @Test
    void testUpdateUserVerification() throws Exception {
        User user = userRepository.save(new User("Jan Kowalski", "jan@kowalski.pl"));
        user.setName("Janek Kowalski");

        mockMvc.perform(put("/users/{id}", user.getId())
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(MockMvcResultMatchers.status().isOk());

        mockMvc.perform(get("/users/{id}", user.getId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Janek Kowalski"));
        System.out.println(objectMapper.writeValueAsString(userRepository.findAll()));
    }

    @Test
    void testUpdateNonExistingUser() throws Exception {
        User user = new User("Non Existent", "nonexistent@user.com");
        mockMvc.perform(put("/users/{id}", 999)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    void testDeleteUser() throws Exception {
        User user = userRepository.save(new User("Jan Kowalski", "jan@kowalski.pl"));

        mockMvc.perform(delete("/users/{id}", user.getId()))
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }

    @Test
    void testDeleteUserNotFound() throws Exception {
        User user = userRepository.save(new User("Jan Kowalski", "jan@kowalski.pl"));

        mockMvc.perform(delete("/users/{id}", user.getId()))
                .andExpect(MockMvcResultMatchers.status().isNoContent());

        mockMvc.perform(get("/users/{id}", user.getId()))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}