<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Winner extends Model
{
    use HasFactory;
    protected $fillable = [
        'developer_id',
        'ranking'
    ];

    public function developer()
    {
        return $this->belongsTo(Developer::class);
    }

    public function createWinnerCron($rank, $developerId)
    {
        return Winner::create([
            'developer_id' => $developerId,
            'ranking' => $rank
        ]);
    }
}
