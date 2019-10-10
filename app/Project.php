<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{

	protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
