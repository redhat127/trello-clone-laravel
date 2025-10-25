<?php

test('home returns 200 response', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
