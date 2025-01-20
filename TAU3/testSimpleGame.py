import unittest
from simpleGame import GameBoard, STOP, OBSTACLE, PLAYER, EMPTY

class TestGameBoard(unittest.TestCase):

    def setUp(self):
        self.game = GameBoard(rows=10, cols=10, number_of_obstacles=20)

    def test_board_size(self):
        self.assertEqual(len(self.game.board), 10)
        self.assertEqual(len(self.game.board[0]), 10)

    def test_start_and_stop_positions(self):
        self.assertEqual(self.game.board[self.game.start[0]][self.game.start[1]], PLAYER)
        self.assertEqual(self.game.board[self.game.stop[0]][self.game.stop[1]], STOP)
        self.assertNotEqual(self.game.start, self.game.stop)

    def test_no_obstacle_on_start_or_stop(self):
        self.assertNotEqual(self.game.board[self.game.start[0]][self.game.start[1]], OBSTACLE)
        self.assertNotEqual(self.game.board[self.game.stop[0]][self.game.stop[1]], OBSTACLE)

    def test_player_initial_position(self):
        self.assertEqual(self.game.player, self.game.start)
        self.assertEqual(self.game.board[self.game.player[0]][self.game.player[1]], PLAYER)

    def test_valid_move(self):
        initial_pos = self.game.player
        new_pos = (initial_pos[0] + 1, initial_pos[1])
        if self.game._is_valid_move(*new_pos):
            self.assertTrue(self.game.move_player('s'))
            self.assertEqual(self.game.player, new_pos)
            self.assertEqual(self.game.board[new_pos[0]][new_pos[1]], PLAYER)
            self.assertEqual(self.game.board[initial_pos[0]][initial_pos[1]], EMPTY)

    def test_invalid_move_obstacle(self):
        obstacle_pos = (self.game.player[0] + 1, self.game.player[1])
        if 0 <= obstacle_pos[0] < self.game.rows:
            self.game.board[obstacle_pos[0]][obstacle_pos[1]] = OBSTACLE
            self.assertFalse(self.game.move_player('s'))
            self.assertEqual(self.game.player, self.game.start)

    def test_invalid_move_bounds(self):
        self.game.player = (0, 0)
        self.assertFalse(self.game.move_player('w'))
        self.assertFalse(self.game.move_player('a'))
        self.assertEqual(self.game.player, (0, 0))

    def test_reaching_stop(self):
        self.game.player = self.game.stop
        self.assertTrue(self.game.is_game_over())

    def test_path_exists(self):
        self.assertIn(self.game.stop, self.game._find_path(self.game.start, self.game.stop))

if __name__ == '__main__':
    unittest.main()